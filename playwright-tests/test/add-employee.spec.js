
const { test, expect } = require('@playwright/test');
import { login } from "../helpers/auth-helper.js";// Import hàm login từ auth-helper.js
import { randomDay, generateRandomEmployee } from "../helpers/random-data-helper.js";
const employee = generateRandomEmployee();
test("Thêm nhân viên", async ({ page }) => {
    //đăng nhập vào hệ thống
    await login(page);
    await page.waitForTimeout(2000);

    // Chuyển đến trang danh sách nhân viên
    await page.goto('http://localhost:5173/staff/staffs-list');
    await page.waitForTimeout(2000);

    // // Click vào nút "Thêm nhân viên"
    // await page.click('text=Thêm nhân viên'); // Click vào nút "Thêm nhân viên"
    // await page.waitForTimeout(2000);

    // // Điền thông tin nhân viên với các trường cơ bản
    // await page.fill('input[placeholder="Nhập tên nhân viên"]', employee.fullName);
    // await page.fill('input[placeholder="Nhập số điện thoại"]', employee.phone);
    // await page.locator('text=Chi nhánh trả lương').locator('..').locator('.ant-select-selector').click();
    // await page.waitForSelector('.ant-select-dropdown:visible');
    // await page.locator('.ant-select-item-option').filter({ hasText: '3C 612 QL13' }).click();
    // await page.waitForTimeout(2000);
    // await page.click('button:has-text("Thêm thông tin")');
    // await page.fill('input[placeholder="Nhập số CMND/CCCD"]', employee.identityCard);
    // await page.click('input[placeholder="Chọn ngày"]');
    // await page.waitForSelector('.ant-picker-dropdown:visible');
    // await page.getByRole('cell', { name: "15", exact: true }).click();
    // await page.waitForTimeout(2000);
    // await page.fill('input[placeholder="Nhập địa chỉ"]', employee.address);
    // await page.fill('input[placeholder="Nhập Email"]', employee.email);
    // // Chọn Khu vực (Tỉnh/Thành phố)
    // await page.locator('.ant-form-item').filter({ hasText: 'Khu vực' }).locator('.ant-select-selector').click();
    // await page.waitForSelector('.ant-select-dropdown:visible');
    // await page.locator('.ant-select-item-option').filter({ hasText: 'Bắc Ninh' }).click();
    // await page.waitForTimeout(2000);
    
    // // Chọn Quận/Huyện - Đợi để danh sách quận/huyện được load
    // await page.locator('.ant-form-item').filter({ hasText: 'Quận/Huyện' }).locator('.ant-select-selector').click();
    // await page.waitForSelector('.ant-select-dropdown:visible');
    // await page.locator('.ant-select-item-option').filter({ hasText: 'Huyện Quế Võ' }).click();
    // await page.waitForTimeout(2000);
    
    // // Nhấn nút "Thêm"
    // await page.locator('button[type="submit"]:has-text("Thêm")').click({force:true});
    // await page.waitForTimeout(2000);
    
    // Tìm kiếm tên nhân viên ngẫu nhiên
    await page.fill('input[placeholder="Theo tên nhân viên"]', employee.fullName);
    await page.locator('input[placeholder="Theo tên nhân viên"]').press('Enter');
    await page.waitForTimeout(2000);
    await page.fill('input[placeholder="Theo tên nhân viên"]', "");
    await page.locator('input[placeholder="Theo tên nhân viên"]').press('Enter');
    await page.waitForTimeout(2000);



})
test.describe("Xem chi tiết nhân viên", () => {
    test("Xem chi tiết nhân viên", async ({ page }) => {
        await login(page);
        await page.waitForTimeout(2000);
        // Chuyển đến trang danh sách nhân viên
        await page.goto('http://localhost:5173/staff/staffs-list');
        await page.waitForTimeout(2000);
        // Click vào mã nhân viên để xem chi tiết
        const employeeCodeCell = page.locator('td').filter({ hasText: /NV\d+|ABC\d+/ }).first();
        await employeeCodeCell.click();
        // await page.locator('[type="button"]').filter({ hasText: 'Thêm thông tin' }).click();
        await page.waitForTimeout(2000);
        await page.locator('.ant-modal-close').click();
        await page.waitForTimeout(2000);
    });
})


// test("Cập nhật thông tin nhân viên", async ({ page }) => {
//     await login(page);
//     await page.waitForTimeout(2000);
//     // Chuyển đến trang danh sách nhân viên
//     await page.goto('http://localhost:5173/staff/staffs-list');
//     await page.waitForTimeout(2000);
//     // Click vào mã nhân viên để xem chi tiết
//     const employeeCodeCell = page.locator('td').filter({ hasText: /NV\d+|ABC\d+/ }).first();
//     await employeeCodeCell.click();
//     await page.waitForTimeout(2000);
//     // Nhập thông tin nhân viên mới
//     await page.fill('input[placeholder="Nhập tên nhân viên"]', "");
//     await page.fill('input[placeholder="Nhập tên nhân viên"]', employee.fullName);
//     await page.waitForTimeout(2000);
//     await page.locator('[type="button"]').filter({ hasText: 'Thêm thông tin' }).click();
//     await page.waitForTimeout(2000);
//     await page.locator('text=Khu vực').locator('..').locator('.ant-select-selector').click();
//     await page.waitForSelector('.ant-select-dropdown:visible');
//     await page.locator('.ant-select-item-option').filter({ hasText: 'Bắc Ninh' }).click();
//     await page.waitForTimeout(2000);
//     await page.locator('text=Quận/Huyện').locator('..').locator('.ant-select-selector').click();
//     await page.waitForSelector('.ant-select-dropdown:visible');
//     await page.locator('.ant-select-item-option').filter({ hasText: 'Huyện Quế Võ' }).click();
//     await page.waitForTimeout(2000);
//     await page.locator('button.ant-btn').filter({ hasText: 'Cập nhật' }).click();
//     await page.waitForTimeout(2000);
// });

// test("Cho phép thêm nhân viên với trường fullName trống (test fail)", async ({ page }) => {
//     // Đăng nhập
//     await login(page);
    
//     // Đi tới trang thêm nhân viên
//     await page.goto('http://localhost:5173/staff/staffs-list');
//     await page.click('text=Thêm nhân viên');

//     // Điền thông tin, để trống fullName
//     await page.fill('input[placeholder="Nhập số điện thoại"]', employee.phone);
    
//     // Chọn chi nhánh trả lương
//     await page.locator('text=Chi nhánh trả lương').locator('..').locator('.ant-select-selector').click();
//     await page.waitForSelector('.ant-select-dropdown:visible');
//     await page.locator('.ant-select-item-option').filter({ hasText: '3C 612 QL13' }).click();

//     // Nhấn nút Thêm
//     await page.locator('button[type="submit"]:has-text("Thêm")').click();

//     // ✅ Giả định sai: Kiểm tra có thông báo thành công (dù biết chắc là sẽ không có)
//     await expect(page.locator('.ant-message-success')).toBeVisible({ timeout: 2000 });

//     // ✅ Giả định sai: Kiểm tra form bị đóng (dù biết chắc là vẫn còn)
//     await expect(page.locator('form')).not.toBeVisible();
// });
