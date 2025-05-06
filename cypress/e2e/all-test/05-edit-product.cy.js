/// <reference types="cypress" />


describe("Sửa hàng hóa", () => {


    it("Sửa hàng hóa hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.get('tr.ant-table-row:nth-child(2)').find('.ant-typography').click();
        cy.wait(1000);
        cy.get('#price').clear().type('20000');
        // Chọn loại thực đơn
        cy.wait(1000);
        cy.get('label')
            .contains('Loại thực đơn')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-item')
            .click();
        cy.contains('.ant-select-item-option-content', 'Đồ uống').click();
        // Lưu thay đổi
        cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });

        // Kiểm tra thông báo thành công
        cy.contains('Cập nhật thành công').should('be.visible');
        cy.wait(1000);

    });
    it("Sửa hàng chế biến không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.get('tr.ant-table-row:nth-child(6)').find('.ant-typography').click();
        cy.wait(2000);
       
        cy.get('#name').clear(); // Xóa tên sản phẩm hiện tại
        // Lưu thay đổi
        cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });

        // Kiểm tra thông báo thành công
        cy.contains('Tên hàng không được trống').should('be.visible');
        cy.wait(1000);
    });


    it("Sửa Giá Bán không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.get('tr.ant-table-row:nth-child(2)').find('.ant-typography').click();
        cy.wait(1000);
        cy.generateRandomProcessedProduct().then(item => {
        // Xóa giá hiện tại và nhập giá không hợp lệ (số thập phân)
            cy.get('#price').clear().type(item.demical);
            cy.wait(1000);
        });



        // Lưu thay đổi
        cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });

        // Kiểm tra thông báo lỗi
        cy.contains('Cập nhật Không Thành công').should('be.visible');
        cy.wait(1000);

        // Kiểm tra vẫn ở trang sửa sản phẩm
        cy.get('form').should('be.visible');
    });

    it("Tắt chi nhánh (Chỉnh sửa sản phẩm)", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.get('tr.ant-table-row:nth-child(2)').find('.ant-typography').click();
        cy.wait(1000);

        // Tắt chi nhánh
       cy.get('.sc-eTulLo > :nth-child(5)').click();
        cy.get(':nth-child(2) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();
        // Lưu thay đổi
        cy.contains('button[type="submit"]', 'Cập nhật').click({ force: true });
        cy.wait(1000);
        // Kiểm tra thông báo thành công
        cy.contains('Cập nhật thành công').should('be.visible');
        cy.wait(1000);
    });
});