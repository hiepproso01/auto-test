/// <reference types="cypress" />

describe("Thêm hàng hóa", () => {
    beforeEach(() => {
        cy.login();
    });

    // it("Thêm hàng hóa chế biến hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();
    //     cy.generateRandomProcessedProduct().then(item => {
    //         // Nhập thông tin sản phẩm
    //         cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
    //         cy.get('input[placeholder="Nhập giá bán"]').type(item.price);

    //         // Chọn loại thực đơn
    //         cy.get('label')
    //             .contains('Loại thực đơn')
    //             .parent()
    //             .siblings('.ant-form-item-control')
    //             .find('.ant-select-selection-search-input')
    //             .click();

    //         cy.get('.ant-select-dropdown').should('be.visible');
    //         cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
    //         cy.wait(1000);
    //         // Chọn đơn vị tính
    //         cy.get('label')
    //             .contains('Đơn vị')
    //             .parent()
    //             .siblings('.ant-form-item-control')
    //             .find('.ant-select-selection-search-input')
    //             .click();

    //         cy.get('.ant-select-dropdown').should('be.visible');
    //         cy.contains('.ant-select-item-option-content', 'Lon').click();
    //         cy.wait(1000);
    //         // Chọn nhóm hàng
    //         cy.get('label')
    //             .contains('Nhóm hàng')
    //             .parent()
    //             .siblings('.ant-form-item-control')
    //             .find('.ant-select-selection-search-input')
    //             .click();

    //         cy.get('.ant-select-dropdown').should('be.visible');
    //         cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });
    //         cy.wait(1000);
    //         cy.get('.ant-upload').first().click({force: true});
    //         cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //         cy.wait(1000);

    //         cy.contains('Thành phần').click();

    //         cy.get("label")
    //             .contains("Hàng hóa thành phần")
    //             .parent()
               
    //             .find('.ant-select-selection-search-input')
    //             .click({ force: true });

    //         // Đợi dropdown hiển thị
    //         cy.get('.ant-select-dropdown').should('be.visible');

    //         // Chọn "Dgh" từ dropdown
    //         cy.contains('.ant-select-item-option-content', 'Dgh').click();
    //         // Submit form
    //         cy.contains('button[type="submit"]', 'Thêm').click({force: true});
    //         cy.get('.ant-message').should('be.visible');
    //         cy.contains('Tạo sản phẩm thành công').should('be.visible');
    //     });
    // });
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
        cy.contains('button[type="submit"]', 'Thêm').click({force: true});
        
        cy.contains('Vui lòng chọn đơn vị').should('be.visible');
        
        // Kiểm tra thêm một số trường bắt buộc khác có hiển thị thông báo lỗi không
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
        //Thêm hàng hóa chế biến
        cy.contains('Thêm hàng chế biến').click();
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
        
        // Chuyển sang tab Thành phần và thêm thành phần
        cy.contains('Thành phần').click();
        
        cy.get("label")
            .contains("Hàng hóa thành phần")
            .parent()
            .find('.ant-select-selection-search-input')
            .click({ force: true });
    
        cy.get('.ant-select-dropdown').should('be.visible');
        cy.contains('.ant-select-item-option-content', 'Dgh').click();
        
        // Thêm thành phần
        cy.contains('button', 'Thêm').click({force: true});
        
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
        
        cy.get("label")
            .contains("Hàng hóa thành phần")
            .parent()
            .find('.ant-select-selection-search-input')
            .click({ force: true });
    
        cy.get('.ant-select-dropdown').should('be.visible');
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
        cy.contains('Thêm hàng chế biến').click();
        cy.wait(1000);
        // Upload hình ảnh
        cy.get('.ant-upload').first().click({force: true});
        cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
        cy.wait(1000);
        
        // Kiểm tra hình ảnh đã được tải lên
        cy.get('.ant-upload-list-item-image').should('be.visible');
        
        // Xóa hình ảnh đã tải lên
        cy.get('.ant-upload-list-item').trigger('mouseover');
        cy.get('.anticon.anticon-delete.delete-icon').click({force: true});
        
        // Kiểm tra hình ảnh đã bị xóa
        cy.get('.ant-upload-list-item-image').should('not.exist');
        
        // Kiểm tra thông báo xóa thành công
        cy.contains('Ảnh xóa được').should('be.visible');
        cy.contains('Thông báo "Thêm hàng chế biến thành công"').should('be.visible');
    });
});


