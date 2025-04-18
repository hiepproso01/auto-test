// Command đăng nhập (nếu cần)
Cypress.Commands.add('login', (branch="arena", username = 'admin', password = '123456') => {
  cy.session([branch, username, password], () => {
    cy.visit('/signin');
    cy.get('form').should('be.visible', { timeout: 10000 });
    cy.get('input[placeholder="Brand"]').type(branch);
    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('button[type="submit"]').click();
    // Kiểm tra đăng nhập thành công
    cy.url().should('include', '/overviews/overview-list', { timeout: 15000 });
  });
});

Cypress.Commands.add('openAddEmployeeModal', () => {
  // Đăng nhập trước khi thực hiện các bước tiếp theo
  cy.login();
  
  // Di chuyển trực tiếp đến trang danh sách nhân viên thay vì click menu
  cy.visit('/staff/staffs-list');
  
  // Đợi trang load hoàn tất
  cy.get('body').should('be.visible', { timeout: 15000 });
  
  // Nhấn nút "Thêm mới nhân viên"
  cy.contains('button', 'Thêm nhân viên', { timeout: 10000 }).click();
  
  // Kiểm tra modal hiển thị
  cy.get('.ant-modal-content', { timeout: 5000 }).should('be.visible');
});

// Command thêm nhân viên mới (tập trung vào các trường cơ bản)
Cypress.Commands.add('fillAndSubmitEmployeeForm', (fullName, username, salaryBranchIndex = 0) => {
  // Nhập tên nhân viên
  cy.get('input[placeholder="Nhập tên nhân viên"]').type(fullName);
  
  // Nhập số điện thoại
  cy.get('input[placeholder="Nhập số điện thoại"]').type(username);
  
  // Chọn chi nhánh trả lương (Ant Design Select)
  cy.get('input[placeholder="Chọn chi nhánh"]').click({force: true});
  cy.get('.ant-select-dropdown').should('be.visible');
  // Chọn theo index để linh hoạt hơn (mặc định là lựa chọn đầu tiên)
  cy.get('.ant-select-item-option').eq(salaryBranchIndex).click();
  
  // Nhấn nút Lưu
  cy.contains('button', 'Lưu').click();
  
  // Đợi thông báo thành công
  cy.get('.ant-message-success', { timeout: 10000 }).should('be.visible');
});