/// <reference types="cypress" />

describe("Thêm hàng hóa", () => {


    it("Thêm hàng hóa hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();

        cy.contains('Thêm hàng').click();
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
            cy.get('input[placeholder="Nhập giá vốn"]').type(item.costPrice);
            // Chọn loại thực đơn
            cy.get('label')
                .contains('Loại thực đơn')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

            cy.get('.ant-select-dropdown').should('be.visible');
            cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
            cy.wait(1000);
            // Chọn đơn vị tính
            cy.get('label')
                .contains('Đơn vị')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

            cy.get('.ant-select-dropdown').should('be.visible');
            cy.contains('.ant-select-item-option-content', 'Lon').click();
            cy.wait(1000);
            // Chọn nhóm hàng
            cy.get('label')
                .contains('Nhóm hàng')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

            cy.get('.ant-select-dropdown').should('be.visible');
            cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });
            cy.wait(1000);
            cy.get('.ant-upload').first().click({force: true});
            cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
            cy.wait(1000);
                    //Chuyển sang tab thứ 2 : tab Mô tả chi tiết
        cy.get('.sc-dqMHui > :nth-child(2)').click();
        cy.get('.se-wrapper-wysiwyg').should('be.visible');

        cy.generateRandomProcessedProduct().then(item => {
        cy.get('.se-wrapper-wysiwyg').type(item.description);
        })
               // Chuyển sang tab chi nhánh
               cy.get('.sc-dqMHui > :nth-child(3)').click();
               cy.get(':nth-child(2) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();
            // Submit form
            cy.contains('button[type="submit"]', 'Thêm').click({force: true});
            cy.get('.ant-message').should('be.visible');
            cy.contains('Tạo sản phẩm thành công').should('be.visible');
        });
       
    });

    it("Thêm hàng hóa nhưng không thêm tên hàng hóa ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa 
        cy.contains('Thêm hàng hóa').click();
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm không hợp lệ
         
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
            cy.get('input[placeholder="Nhập giá vốn"]').type(item.costPrice);
        });

       cy.wait(1000);
        // Chọn loại thực đơn
        cy.get('label')
            .contains('Loại thực đơn')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
        cy.wait(1000);
        // Chọn đơn vị tính
        cy.get('label')
            .contains('Đơn vị')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Lon').click();
        cy.wait(1000);
        // Chọn nhóm hàng
        cy.get('label')
            .contains('Nhóm hàng')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });

        // Chuyển sang tab Thành phần nhưng không thêm thành phần
    
        cy.wait(1000);
        // Submit form khi chưa thêm thành phần
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});

        // Kiểm tra thông báo lỗi
        cy.contains('Tên hàng không được trống').should('be.visible');
        cy.wait(1000);
    });
    it("Thêm thông tin hàng hóa không hợp lệ (Giá bán không hợp lệ)", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa 
        cy.contains('Thêm hàng hóa').click();
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm không hợp lệ
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type("10.5");
            cy.get('input[placeholder="Nhập giá vốn"]').type(item.costPrice);
        });

       cy.wait(1000);
        // Chọn loại thực đơn
        cy.get('label')
            .contains('Loại thực đơn')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
        cy.wait(1000);
        // Chọn đơn vị tính
        cy.get('label')
            .contains('Đơn vị')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Lon').click();
        cy.wait(1000);
        // Chọn nhóm hàng
        cy.get('label')
            .contains('Nhóm hàng')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });

        // Chuyển sang tab Thành phần nhưng không thêm thành phần
    
        cy.wait(1000);
        // Submit form khi chưa thêm thành phần
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});

       // Kiểm tra thông báo lỗi giá bán
    cy.contains('Giá bán không hợp lệ').should('be.visible');
    });

    it("Thêm ảnh không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa 
        cy.contains('Thêm hàng hóa').click();

        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
            cy.get('input[placeholder="Nhập giá vốn"]').type(item.costPrice);
        });

        // Chọn loại thực đơn
        cy.get('label')
            .contains('Loại thực đơn')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
        cy.wait(1000);

        // Chọn đơn vị tính
        cy.get('label')
            .contains('Đơn vị')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Lon').click();
        cy.wait(1000);

        // Chọn nhóm hàng
        cy.get('label')
            .contains('Nhóm hàng')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });

        // Upload file không hợp lệ (file word)
        cy.get('.ant-upload').first().click({force: true});
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/text.txt', { force: true });

        cy.contains('button[type="submit"]', 'Thêm').click({force: true});
        cy.contains('Thêm hàng chế biến không thành công').should('be.visible');
        cy.wait(1000);
    });

    it("Xóa hình ảnh", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa 
        cy.contains('Thêm hàng').click();
        cy.wait(1000);
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);

            // Chọn loại thực đơn
            cy.get('label')
                .contains('Loại thực đơn')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

            cy.get('.ant-select-dropdown').should('be.visible');
            cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
            cy.wait(1000);
            // Chọn đơn vị tính
            cy.get('label')
                .contains('Đơn vị')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

            cy.get('.ant-select-dropdown').should('be.visible');
            cy.contains('.ant-select-item-option-content', 'Lon').click();
            cy.wait(1000);
            // Chọn nhóm hàng
            cy.get('label')
                .contains('Nhóm hàng')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

            cy.get('.ant-select-dropdown').should('be.visible');
            cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });
            cy.wait(1000);
        });

        cy.get('.ant-upload').first().click({ force: true });
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
        cy.wait(1000);
        // Upload hình ảnh
        cy.get('.ant-upload').first().click({ force: true });
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
        cy.wait(1000);

        // Kiểm tra hình ảnh đã được tải lên
        cy.get('img[alt="uploaded"]').should('be.visible');
        // Xóa hình ảnh đã tải lên
        cy.get('.delete-icon').click({ force: true });
        cy.wait(1000);
        // Kiểm tra hình ảnh đã bị xóa
        cy.get('img[alt="uploaded"]').should('not.exist');

        cy.wait(1000);
    }); 

  
});
