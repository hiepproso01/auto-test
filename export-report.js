const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const { parse } = require('node-html-parser');

// Tạo Excel workbook
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Test Results');

// Thiết lập cột
worksheet.columns = [
  { header: 'Test File', key: 'testFile', width: 30 },
  { header: 'Test Case', key: 'testCase', width: 50 },
  { header: 'Status', key: 'status', width: 10 },
  { header: 'Duration', key: 'duration', width: 15 },
  { header: 'Error', key: 'error', width: 50 },
];

// Style cho header
worksheet.getRow(1).font = { bold: true, size: 12 };
worksheet.getRow(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFD3D3D3' }
};

let testCaseCount = 0;

// Thứ tự ưu tiên các nguồn dữ liệu
function processAllSources() {
  // 1. Thử đọc file results.json (chi tiết nhất)
  if (processResultsJson()) {
    console.log('Đã đọc kết quả từ file results.json');
    return true;
  }
  
  // 2. Thử đọc từ HTML report mới nhất
  if (processHTMLReport()) {
    console.log('Đã đọc kết quả từ HTML report');
    return true;
  }
  
  // 3. Thử đọc từ thư mục test-results
  if (processTestResultsDir()) {
    console.log('Đã đọc kết quả từ thư mục test-results');
    return true;
  }
  
  // Không tìm thấy kết quả từ đâu
  return false;
}

// Đọc từ file results.json (nếu có)
function processResultsJson() {
  const resultsPath = path.join(__dirname, 'results.json');
  if (!fs.existsSync(resultsPath)) {
    console.log('Không tìm thấy file results.json');
    return false;
  }
  
  try {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    
    // Xử lý cấu trúc của file results.json
    if (results.suites) {
      processTestSuites(results.suites);
    }
    
    return testCaseCount > 0;
  }
  catch (error) {
    console.error('Lỗi khi đọc file results.json:', error);
    return false;
  }
}

// Xử lý các test suites (đệ quy)
function processTestSuites(suites, parentTitle = '') {
  suites.forEach(suite => {
    const suiteTitle = parentTitle ? `${parentTitle} > ${suite.title}` : suite.title;
    
    // Xử lý các tests trong suite này
    if (suite.specs) {
      suite.specs.forEach(spec => {
        const testFile = spec.file ? path.basename(spec.file) : 'Unknown';
        const testName = spec.title || 'Unnamed test';
        const status = spec.ok ? 'passed' : 'failed';
        const duration = spec.duration ? `${spec.duration}ms` : 'N/A';
        const error = spec.error || '';
        
        addTestCase(testFile, testName, status, duration, error);
        testCaseCount++;
      });
    }
    
    // Xử lý đệ quy các suite con
    if (suite.suites) {
      processTestSuites(suite.suites, suiteTitle);
    }
  });
}

// Đọc từ HTML report
function processHTMLReport() {
  const reportPath = path.join(__dirname, 'playwright-report', 'index.html');
  if (!fs.existsSync(reportPath)) {
    console.log('Không tìm thấy file HTML report');
    return false;
  }
  
  try {
    const htmlReport = fs.readFileSync(reportPath, 'utf8');
    const root = parse(htmlReport);
    
    // Phiên bản Playwright mới (v1.30+) sử dụng structure khác
    const testRows = root.querySelectorAll('[data-testid="testcase-row"], .test-row');
    
    if (testRows && testRows.length > 0) {
      testRows.forEach(row => {
        // Trích xuất thông tin từ row
        const testFile = extractText(row, '[data-testid="file-name"], .test-file') || 'Unknown';
        const testName = extractText(row, '[data-testid="test-name"], .test-name') || 'Unknown';
        const status = extractText(row, '[data-testid="status"], .status') || 'unknown';
        const duration = extractText(row, '[data-testid="duration"], .duration') || 'N/A';
        const error = extractText(row, '.test-error') || '';
        
        addTestCase(testFile, testName, status, duration, error);
        testCaseCount++;
      });
    }
    
    return testCaseCount > 0;
  }
  catch (error) {
    console.error('Lỗi khi đọc HTML report:', error);
    return false;
  }
}

// Trích xuất text từ element
function extractText(element, selectors) {
  const selectorList = selectors.split(', ');
  for (const selector of selectorList) {
    const found = element.querySelector(selector);
    if (found) {
      return found.text.trim();
    }
  }
  return '';
}

// Đọc từ thư mục test-results
function processTestResultsDir() {
  const resultsDir = path.join(__dirname, 'test-results');
  if (!fs.existsSync(resultsDir)) {
    console.log('Không tìm thấy thư mục test-results');
    return false;
  }
  
  try {
    // Liệt kê các thư mục con (mỗi thư mục là một test)
    const dirs = fs.readdirSync(resultsDir, { withFileTypes: true })
      .filter(item => item.isDirectory() && !item.name.startsWith('.'))
      .map(item => item.name);
    
    dirs.forEach(dir => {
      const testDir = path.join(resultsDir, dir);
      
      // Phân tích tên test từ tên thư mục
      const parts = dir.split('-');
      const testFile = parts.length > 1 ? parts.slice(0, -1).join('-') : dir;
      const browser = parts.length > 1 ? parts[parts.length - 1] : '';
      
      // Tìm các chi tiết trong từng thư mục
      const testName = dir.replace(/-chromium$|-firefox$|-webkit$/, '')
                          .replace(/playwright-tests-auth-/, '')
                          .replace(/-/g, ' ');
      
      // Đọc trace.zip hoặc các file khác để xác định trạng thái
      const hasTrace = fs.existsSync(path.join(testDir, 'trace.zip'));
      const hasError = fs.existsSync(path.join(testDir, 'test-failed-1.png'));
      
      const status = hasError ? 'failed' : 'passed';
      const duration = 'N/A'; // Không có thông tin thời gian từ thư mục
      const error = hasError ? 'See test-failed screenshot in results directory' : '';
      
      addTestCase(testFile, testName, status, duration, error);
      testCaseCount++;
    });
    
    return testCaseCount > 0;
  }
  catch (error) {
    console.error('Lỗi khi đọc thư mục test-results:', error);
    return false;
  }
}

// Thêm test case vào worksheet
function addTestCase(testFile, testCase, status, duration, error) {
  const row = worksheet.addRow({
    testFile,
    testCase,
    status,
    duration,
    error
  });
  
  // Tô màu trạng thái
  const statusCell = row.getCell('status');
  if (status.toLowerCase().includes('pass')) {
    statusCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF90EE90' } // Light green
    };
  } else if (status.toLowerCase().includes('fail')) {
    statusCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF6347' } // Tomato
    };
  }
}

// Xử lý các nguồn dữ liệu và xuất Excel
const success = processAllSources();
if (!success) {
  // Không tìm thấy kết quả, thêm thông báo không có dữ liệu
  worksheet.addRow({
    testFile: 'N/A',
    testCase: 'Không tìm thấy kết quả test nào',
    status: 'Unknown',
    duration: '',
    error: 'Vui lòng chạy test với reporter json và html trước khi export báo cáo'
  });
}

// Tạo tên file với timestamp
const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
const filename = `test-report-${timestamp}.xlsx`;

// Lưu file Excel
workbook.xlsx.writeFile(filename)
  .then(() => {
    console.log(`Báo cáo đã được xuất thành công: ${filename}`);
  })
  .catch(error => {
    console.error('Lỗi khi lưu file Excel:', error);
  });