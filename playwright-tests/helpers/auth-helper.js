/**
 * Đăng nhập vào hệ thống
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} branch - Tên chi nhánh
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 */
async function login(page, branch = 'arena', username = 'admin', password = '123456') {
    await page.goto('http://localhost:5173/signin');
    await page.fill('input[placeholder="Brand"]', branch);
    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Password"]', password);
    await page.click('button[type="submit"]');
    
    // Kiểm tra đăng nhập thành công
    await page.waitForURL(/overviews\/overview-list/);
  }
  
  module.exports = { login };