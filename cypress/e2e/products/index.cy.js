/// <reference types="cypress" />


beforeEach(() => {
    cy.login();
});
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



describe("Thêm hàng hóa chế biến", () => {

    it("Thêm hàng hóa chế biến hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();
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
            cy.get('.ant-upload').first().click({force: true});
            cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
            cy.wait(1000);

            cy.contains('Thành phần').click();

            cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
            // Chọn "Dgh" từ dropdown
            cy.contains('.ant-select-item-option-content', 'Dgh').click();
            // Submit form
            cy.contains('button[type="submit"]', 'Thêm').click({force: true});
            cy.get('.ant-message').should('be.visible');
            cy.contains('Tạo sản phẩm thành công').should('be.visible');
        });
    });

    it("Thêm hàng hóa chế biến không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm không hợp lệ
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
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
        cy.contains('Thành phần').click();
        cy.wait(1000);
        // Submit form khi chưa thêm thành phần
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});

        // Kiểm tra thông báo lỗi
        cy.contains('Bạn chưa nhập hàng hóa thành phần cho hàng chế biến').should('be.visible');
        cy.wait(1000);
    });

    it("Thêm tin hàng chế biến để trống", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();

        // Không nhập bất kỳ thông tin nào

        // Nhấn nút Submit để kiểm tra thông báo lỗi
        cy.contains('button[type="submit"]', 'Thêm').click({ force: true });

        cy.contains('Vui lòng chọn đơn vị').should('be.visible');
        cy.contains('Tên hàng không được trống').should('be.visible');
        cy.contains('Vui lòng chọn loại thực đơn').should('be.visible');
        cy.contains('Vui lòng chọn nhóm hàng').should('be.visible');
        cy.wait(1000);
    });
    it("Thêm Giá bán không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm dịch vụ
        cy.contains('Thêm dịch vụ').click();
        cy.generateRandomProcessedProduct().then(item => {
        // Nhập tên sản phẩm hợp lệ
        cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);

        // Nhập giá bán không hợp lệ (giá trị thập phân)
        cy.get('input[placeholder="Nhập giá bán"]').type("10.5");
       
        });


        // Chọn nhóm hàng
        cy.get('label')
            .contains('Nhóm hàng')
            .parent()
            .siblings('.ant-form-item-control')
            .find('.ant-select-selection-search-input')
            .click();

        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });


        // Submit form
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});

        cy.contains('Giá bán không hợp lệ. Vui lòng nhập lại').should('be.visible');
        cy.wait(1000);
    });

    it("Thêm ảnh không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm dịch vụ').click();

        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
        
        });


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
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();
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
        cy.contains('Thành phần').click();

       cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
        cy.wait(1000);
    });
    it("Tắt chi nhánh ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();
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
        cy.wait(1000);
        cy.contains('Thành phần').click();

        cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
        cy.wait(1000);
      // Chuyển sang tab chi nhánh
        cy.get('.sc-dqMHui > :nth-child(4)').click();
        cy.get(':nth-child(1) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();

        // Tiếp tục quy trình thêm hàng
        // cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
    })



    it("Thêm mô tả chi tiết", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();
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
        //Chuyển sang tab thứ 2 : tab Mô tả chi tiết
        cy.get('.sc-dqMHui > :nth-child(2)').click();
        cy.get('.se-wrapper-wysiwyg').should('be.visible');

        cy.generateRandomProcessedProduct().then(item => {
        cy.get('.se-wrapper-wysiwyg').type(item.description);
        })
    })  
});

describe("Thêm dịch vụ", () => {

    it("Thêm dịch vụ hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm dịch vụ
        cy.contains('Thêm dịch vụ').click();
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
            cy.get('.ant-upload').first().click({force: true});
            cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
            cy.wait(1000);

            // Submit form
            cy.contains('button[type="submit"]', 'Thêm').click({force: true});
            cy.get('.ant-message').should('be.visible');
            cy.contains('Tạo sản phẩm thành công').should('be.visible');
        });
    });


    it("Thêm thông tin dịch vụ để trống", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm dịch vụ').click();

        // Không nhập bất kỳ thông tin nào

        // Nhấn nút Submit để kiểm tra thông báo lỗi
        cy.contains('button[type="submit"]', 'Thêm').click({ force: true });

        cy.contains('Tên hàng không được trống').should('be.visible');
        cy.contains('Vui lòng chọn nhóm hàng').should('be.visible');
        cy.wait(1000);
    });

    it("Thêm Giá bán không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm dịch vụ
        cy.contains('Thêm dịch vụ').click();
        cy.generateRandomProcessedProduct().then(item => {
        // Nhập tên sản phẩm hợp lệ
        cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);

        // Nhập giá bán không hợp lệ (giá trị thập phân)
        cy.get('input[placeholder="Nhập giá bán"]').type("10.5");
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


        // Submit form
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});

        cy.contains('Giá bán không hợp lệ. Vui lòng nhập lại').should('be.visible');
        cy.wait(1000);
    });
    it("Thêm ảnh không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();

        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
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
        cy.contains('Thành phần').click();

        cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
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
        //Thêm hàng hóa chế biến
        cy.contains('Thêm dịch vụ').click();
        cy.wait(1000);
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
            cy.get('input[placeholder="Nhập giá vốn"]').type(item.costPrice);
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

    it("Tắt chi nhánh ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm dịch vụ').click();
        cy.wait(1000);
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
            cy.get('input[placeholder="Nhập giá vốn"]').type(item.costPrice);
            // Chọn nhóm hàng
        cy.get('label')
                .contains('Nhóm hàng')
                .parent()
                .siblings('.ant-form-item-control')
                .find('.ant-select-selection-search-input')
                .click();

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
        cy.wait(1000);

      // Chuyển sang tab chi nhánh
        cy.get('.sc-dqMHui > :nth-child(3)').click();
        cy.get(':nth-child(1) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();

        // Tiếp tục quy trình thêm hàng
        // cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
    })



    it("Thêm mô tả chi tiết", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm hàng hóa chế biến
        cy.contains('Thêm dịch vụ').click();
        cy.wait(1000);
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
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
        //Chuyển sang tab thứ 2 : tab Mô tả chi tiết
        cy.get('.sc-dqMHui > :nth-child(2)').click();
        cy.get('.se-wrapper-wysiwyg').should('be.visible');

        cy.generateRandomProcessedProduct().then(item => {
        cy.get('.se-wrapper-wysiwyg').type(item.description);
        })
    })  
});
describe("Thêm combo - đóng gói", () => {

    it("Thêm combo - đóng gói hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();
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
            cy.get('.ant-upload').first().click({ force: true });
            cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
            cy.wait(1000);

            cy.contains('Thành phần').click();

            cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
            // Chọn "Dgh" từ dropdown
            cy.contains('.ant-select-item-option-content', 'Dgh').click();
            // Submit form
            cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
            cy.get('.ant-message').should('be.visible');
            cy.contains('Tạo sản phẩm thành công').should('be.visible');
        });
    });

    it("Thêm combo - đóng gói không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm không hợp lệ
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
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
        cy.contains('Thành phần').click();
        cy.wait(1000);
        // Submit form khi chưa thêm thành phần
        cy.contains('button[type="submit"]', 'Thêm').click({ force: true });

        // Kiểm tra thông báo lỗi
        cy.contains('Bạn chưa nhập hàng hóa thành phần cho hàng combo - đóng gói').should('be.visible');
        cy.wait(1000);
    });

    it("Thêm tin hàng combo - đóng gói để trống", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();

        // Không nhập bất kỳ thông tin nào

        // Nhấn nút Submit để kiểm tra thông báo lỗi
        cy.contains('button[type="submit"]', 'Thêm').click({ force: true });

        cy.contains('Vui lòng chọn đơn vị').should('be.visible');
        cy.contains('Tên hàng không được trống').should('be.visible');
        cy.contains('Vui lòng chọn loại thực đơn').should('be.visible');
        cy.contains('Vui lòng chọn nhóm hàng').should('be.visible');
        cy.wait(1000);
    });
    it("Thêm Giá bán không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();
        cy.generateRandomProcessedProduct().then(item => {
            // Nhập tên sản phẩm hợp lệ
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);

            // Nhập giá bán không hợp lệ (giá trị thập phân)
            cy.get('input[placeholder="Nhập giá bán"]').type("10.5");

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


        // Submit form
        cy.contains('button[type="submit"]', 'Thêm').click({ force: true });

        cy.contains('Giá bán không hợp lệ. Vui lòng nhập lại').should('be.visible');
        cy.wait(1000);
    });

    it("Thêm ảnh không hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();

        cy.generateRandomProcessedProduct().then(item => {
            // Nhập thông tin sản phẩm
            cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
            cy.get('input[placeholder="Nhập giá bán"]').type(item.price);

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
        cy.get('.ant-upload').first().click({ force: true });
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/text.txt', { force: true });
        cy.contains('Thành phần').click();

        cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
        // Chọn "Dgh" từ dropdown
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
        cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
        cy.contains('Thêm combo - đóng gói không thành công').should('be.visible');
        cy.wait(1000);
    });

    it("Xóa hình ảnh", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();
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
        cy.contains('Thành phần').click();

        cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
        cy.wait(1000);
    });
    it("Tắt chi nhánh", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();
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
        cy.wait(1000);
        cy.contains('Thành phần').click();

        cy.get('.sc-csIIoV > .ant-select > .ant-select-selector').type("Dgh");
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
        cy.wait(1000);
        // Chuyển sang tab chi nhánh
        cy.get('.sc-dqMHui > :nth-child(4)').click();
        cy.get(':nth-child(1) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();

        // Tiếp tục quy trình thêm hàng
        // cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
    })



    it("Thêm mô tả chi tiết", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Thêm').closest('button').click();
        //Thêm combo - đóng gói
        cy.contains('Thêm combo - đóng gói').click();
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
        //Chuyển sang tab thứ 2 : tab Mô tả chi tiết
        cy.get('.sc-dqMHui > :nth-child(2)').click();
        cy.get('.se-wrapper-wysiwyg').should('be.visible');

        cy.generateRandomProcessedProduct().then(item => {
            cy.get('.se-wrapper-wysiwyg').type(item.description);
        })
})
})

describe(" Xem chi tiết sản phẩm",()=>{
    it("Xem chi tiết hàng hóa",()=>{
    cy.visit("/overviews/overview-list");
    cy.get('body').should('be.visible');

    cy.contains('Hàng hoá').trigger('mouseover');
    cy.contains('Danh mục').should('be.visible').click();
    cy.url().should('include', '/products/product-list');

    // Nhấp vào hàng hóa đã thêm
    cy.get('tr.ant-table-row:nth-child(2)').find('.ant-typography').click();
    cy.wait(2000);
    cy.contains("button", "Bỏ qua").click();
    cy.wait(1000);
    })

})
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

describe(" Xóa sản phẩm",()=>{
    it("Xóa sản phẩm",()=>{
    cy.visit("/overviews/overview-list");
    cy.get('body').should('be.visible');

    cy.contains('Hàng hoá').trigger('mouseover');
    cy.contains('Danh mục').should('be.visible').click();
    cy.url().should('include', '/products/product-list');

    // Nhấp vào hàng hóa đã thêm
    cy.get('tr.ant-table-row:nth-child(2)').find('.ant-typography').click();
    cy.wait(2000);
    //Nhấn nút xóa
    cy.get('.sc-ddLvXF').click();
    cy.wait(1000);
    //Nhấn nút đồng ý trong ConfirmModal
    cy.get('.sc-jEbSJj').click();
    cy.wait(1000);
    })

})

describe("Lọc và tìm kiếm hàng hóa", () => {

    it("Tìm kiếm theo tên sản phẩm",() =>{
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');
        
      cy.generateRandomProcessedProduct().then(item => {
        cy.get('.ant-input-affix-wrapper > .ant-input').type(item.name);
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper > .ant-input').type('{enter}');
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper > .ant-input').clear();
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper > .ant-input').type('{enter}');
        cy.wait(1000);
        
        cy.get('.ant-input-affix-wrapper > .ant-input').type("Trà sữa tươi trân châu");
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper > .ant-input').type('{enter}');
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper > .ant-input').clear();
        cy.wait(1000);
        cy.get('.ant-input-affix-wrapper > .ant-input').type('{enter}');
        cy.wait(1000);
      });

    })
    it("Lọc danh sách theo loại thực đơn",()=>{
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.get(':nth-child(3) > .sc-fOSqom > [enter="[object Object]"] > :nth-child(3) > .sc-cxcZSd > .ant-checkbox-wrapper').click();
        cy.wait(1000);
        cy.get(':nth-child(3) > .sc-fOSqom > [enter="[object Object]"] > :nth-child(3) > .sc-cxcZSd > .ant-checkbox-wrapper').click();
        cy.wait(1000);
        cy.get(':nth-child(3) > .sc-fOSqom > [enter="[object Object]"] > :nth-child(2) > .sc-cxcZSd > .ant-checkbox-wrapper').click();
        cy.wait(1000);
    })
    it("Lọc danh sách theo loại hàng",()=>{
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.get(':nth-child(4) > .sc-fOSqom > [enter="[object Object]"] > :nth-child(3) > .sc-cxcZSd > .ant-checkbox-wrapper').click();
        cy.wait(1000);
        cy.get(':nth-child(4) > .sc-fOSqom > [enter="[object Object]"] > :nth-child(3) > .sc-cxcZSd > .ant-checkbox-wrapper').click();
        cy.wait(1000);
        cy.get(':nth-child(4) > .sc-fOSqom > [enter="[object Object]"] > :nth-child(2) > .sc-cxcZSd > .ant-checkbox-wrapper').click();
        cy.wait(1000);
    })
    it("Xuất file Excel",()=>{
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        cy.contains('span', 'Xuất file').closest('button').click();
        cy.wait(1000);
    })

    it("Lọc danh sách theo nhóm hàng", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');
        // Scroll để hiển thị tất cả các mục trong dropdown
        cy.scrollTo(0,300);
        cy.wait(1000);
        // Chọn nhóm hàng "Nước ngọt"
        cy.contains('Nước ngọt').click();
        cy.wait(1000);
        cy.scrollTo(0,0);
        cy.scrollTo(0,300);
        cy.wait(1000);
        // Chọn lại "Tất cả" để reset bộ lọc
        cy.contains('Tất cả').click();
        cy.wait(1000);
        cy.scrollTo(0,0);
    });

   it("Lọc theo tồn kho",()=>{
    cy.visit("/overviews/overview-list");
    cy.get('body').should('be.visible');
    cy.contains('Hàng hoá').trigger('mouseover');
    cy.contains('Danh mục').should('be.visible').click();
    cy.url().should('include', '/products/product-list');
    // Scroll để hiển thị tất cả các mục trong dropdown 
    cy.wait(1000);
    cy.get(':nth-child(5) > .sc-bYgHSN > .ant-radio-wrapper > .ant-radio > .ant-radio-input')
    .scrollIntoView() // Cuộn đến vị trí của checkbox
    .click();
    cy.wait(2000);
    cy.scrollTo(0,0);
    cy.wait(2000);

   });
});