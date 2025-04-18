// Thêm vào file add-employee-v3.cy.js

describe('Kiểm tra validation khi thêm nhân viên', () => {
    it("Cho phép thêm nhân viên với trường fullName trống (test fail)", () => {
      // Đăng nhập
      cy.login();
      
      // Đi tới trang thêm nhân viên
      cy.visit('/staff/staffs-list');
      cy.contains('Thêm nhân viên').click();
  
      // Tạo dữ liệu nhân viên test
      cy.generateRandomEmployee().then((employee) => {
        // Điền thông tin, để trống fullName
        cy.get('input[placeholder="Nhập số điện thoại"]').type(employee.phone);
        
        // Chọn chi nhánh trả lương
        cy.contains('Chi nhánh trả lương').parent().find('.ant-select-selector').click({force: true});
        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option', '3C 612 QL13').click();
  
        // Nhấn nút Thêm
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});
  
        // ✅ Giả định sai: Kiểm tra có thông báo thành công (dù biết chắc là sẽ không có)
        cy.get('.ant-message-success', { timeout: 2000 }).should('be.visible');
  
        // ✅ Giả định sai: Kiểm tra form bị đóng (dù biết chắc là vẫn còn)
        cy.get('form').should('not.exist');
      });
    });
  });