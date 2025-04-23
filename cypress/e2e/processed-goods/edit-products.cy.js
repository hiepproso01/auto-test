/// <reference types="cypress" />

describe("Sửa hàng chế biến", () => {
    beforeEach(() => {
        cy.login();
    });

    // it("Sửa hàng chế biến hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.get('[data-row-key="bb46f966-b70b-4e3e-b3d7-1dbb4b7528e9"] > :nth-child(1) > .ant-typography > div').click({ force: true });
    //     cy.wait(1000);

    //     // Lưu thay đổi
    //     cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });

    //     // Kiểm tra thông báo thành công
    //     cy.contains('Cập nhật thành công').should('be.visible');
    //     cy.wait(1000);

    // });
    // it("Sửa hàng chế biến không hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.get('[data-row-key="bb46f966-b70b-4e3e-b3d7-1dbb4b7528e9"] > :nth-child(1) > .ant-typography > div').click({ force: true });
    //     cy.wait(1000);
    //     cy.get('input[placeholder="Nhập tên hàng"]').clear();
    //     // Lưu thay đổi
    //     cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });

    //     // Kiểm tra thông báo thành công
    //     cy.contains('Tên hàng không được trống').should('be.visible');
    //     cy.wait(1000);
    // });
    // it("Sửa Giá Bán hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.get('[data-row-key="bb46f966-b70b-4e3e-b3d7-1dbb4b7528e9"] > :nth-child(1) > .ant-typography > div').click({ force: true });
    //     cy.wait(1000);
    //     cy.generateRandomProcessedProduct().then(item => {
    //         cy.get('#price').clear().type(item.price);
    //         cy.wait(1000);
    //     });
    //     // Xóa giá hiện tại và nhập giá hợp lệ mới (số nguyên)
      
        
    //     // Lưu thay đổi
    //     cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });
        
    //     // Kiểm tra thông báo thành công
    //     cy.contains('Cập nhật Thành công').should('be.visible');
    //     cy.wait(1000);
        
    //     // Kiểm tra giá đã được cập nhật - nếu có thể truy cập thông tin chi tiết
    //     cy.contains('20,000').should('be.visible');
    // });
    
    // it("Sửa Giá Bán không hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.get('[data-row-key="bb46f966-b70b-4e3e-b3d7-1dbb4b7528e9"] > :nth-child(1) > .ant-typography > div').click({ force: true });
    //     cy.wait(1000);
    //     cy.generateRandomProcessedProduct().then(item => {
    //     // Xóa giá hiện tại và nhập giá không hợp lệ (số thập phân)
    //         cy.get('#price').clear().type(item.demical);
    //         cy.wait(1000);
    //     });
     
        
        
    //     // Lưu thay đổi
    //     cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });
        
    //     // Kiểm tra thông báo lỗi
    //     cy.contains('Giá bán không được là số âm, số thập phân. Vui lòng nhập lại').should('be.visible');
    //     cy.contains('Cập nhật Không Thành công').should('be.visible');
    //     cy.wait(1000);
        
    //     // Kiểm tra vẫn ở trang sửa sản phẩm
    //     cy.get('form').should('be.visible');
    // });

    // it("Tắt chi nhánh (Chỉnh sửa sản phẩm)", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.get('[data-row-key="1c522cc7-fdd7-4f70-9d27-a52f4a7ff964"] > :nth-child(1) > .ant-typography > div').click({ force: true });
    //     cy.wait(1000);
        
    //     // Tắt chi nhánh
    //    cy.get('.sc-eTulLo > :nth-child(6)').click();
    //     cy.get(':nth-child(1) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();
    //     // Lưu thay đổi
    //     cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });
    //     cy.wait(1000);
    // });
});