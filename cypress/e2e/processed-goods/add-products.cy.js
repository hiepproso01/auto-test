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
    // it("Thêm hàng hóa chế biến không hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();
    //     cy.generateRandomProcessedProduct().then(item => {
    //         // Nhập thông tin sản phẩm không hợp lệ
    //         cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);
    //         cy.get('input[placeholder="Nhập giá bán"]').type(item.price);
    //     });

    //    cy.wait(1000);
    //     // Chọn loại thực đơn
    //     cy.get('label')
    //         .contains('Loại thực đơn')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
    //     cy.wait(1000);
    //     // Chọn đơn vị tính
    //     cy.get('label')
    //         .contains('Đơn vị')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Lon').click();
    //     cy.wait(1000);
    //     // Chọn nhóm hàng
    //     cy.get('label')
    //         .contains('Nhóm hàng')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });

    //     // Chuyển sang tab Thành phần nhưng không thêm thành phần
    //     cy.contains('Thành phần').click();
    //     cy.wait(1000);
    //     // Submit form khi chưa thêm thành phần
    //     cy.contains('button[type="submit"]', 'Thêm').click({force: true});

    //     // Kiểm tra thông báo lỗi
    //     cy.contains('Bạn chưa nhập hàng hóa thành phần cho hàng chế biến').should('be.visible');
    //     cy.wait(1000);
    // });
    // it("Thêm tin hàng chế biến để trống", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();

    //     // Không nhập bất kỳ thông tin nào

    //     // Nhấn nút Submit để kiểm tra thông báo lỗi
    //     cy.contains('button[type="submit"]', 'Thêm').click({ force: true });

    //     cy.contains('Vui lòng chọn đơn vị').should('be.visible');
    //     cy.contains('Tên hàng không được trống').should('be.visible');
    //     cy.contains('Vui lòng chọn loại thực đơn').should('be.visible');
    //     cy.contains('Vui lòng chọn nhóm hàng').should('be.visible');
    //     cy.wait(1000);
    // });
    // it("Thêm Giá bán không hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();
    //     cy.generateRandomProcessedProduct().then(item => {
    //     // Nhập tên sản phẩm hợp lệ
    //     cy.get('input[placeholder="Nhập tên hàng"]').type(item.name);

    //     // Nhập giá bán không hợp lệ (giá trị thập phân)
    //     cy.get('input[placeholder="Nhập giá bán"]').type("10.5");
    //     });
    //     // Chọn loại thực đơn
    //     cy.get('label')
    //         .contains('Loại thực đơn')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
    //     cy.wait(1000);

    //     // Chọn đơn vị tính
    //     cy.get('label')
    //         .contains('Đơn vị')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Lon').click();
    //     cy.wait(1000);

    //     // Chọn nhóm hàng
    //     cy.get('label')
    //         .contains('Nhóm hàng')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });

    //     // Chuyển sang tab Thành phần và thêm thành phần
    //     cy.contains('Thành phần').click();

    //     cy.get("label")
    //         .contains("Hàng hóa thành phần")
    //         .parent()
    //         .find('.ant-select-selection-search-input')
    //         .click({ force: true });

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Dgh').click();

    //     // Thêm thành phần
    //     cy.contains('button', 'Thêm').click({force: true});

    //     // Submit form
    //     cy.contains('button[type="submit"]', 'Thêm').click({force: true});

    //     cy.contains('Giá bán không hợp lệ. Vui lòng nhập lại').should('be.visible');
    //     cy.wait(1000);
    // });
    // it("Thêm ảnh không hợp lệ", () => {
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
    //     });

    //     // Chọn loại thực đơn
    //     cy.get('label')
    //         .contains('Loại thực đơn')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Tiền giờ').click();
    //     cy.wait(1000);

    //     // Chọn đơn vị tính
    //     cy.get('label')
    //         .contains('Đơn vị')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Lon').click();
    //     cy.wait(1000);

    //     // Chọn nhóm hàng
    //     cy.get('label')
    //         .contains('Nhóm hàng')
    //         .parent()
    //         .siblings('.ant-form-item-control')
    //         .find('.ant-select-selection-search-input')
    //         .click();

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Nước ngọt').click({ force: true });

    //     // Upload file không hợp lệ (file word)
    //     cy.get('.ant-upload').first().click({force: true});
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/text.txt', { force: true });
    //     cy.contains('Thành phần').click();

    //     cy.get("label")
    //         .contains("Hàng hóa thành phần")
    //         .parent()
    //         .find('.ant-select-selection-search-input')
    //         .click({ force: true });

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Dgh').click();
    //     cy.contains('button[type="submit"]', 'Thêm').click({force: true});
    //     cy.contains('Thêm hàng chế biến không thành công').should('be.visible');
    //     cy.wait(1000);
    // });

    // it("Xóa hình ảnh", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();
    //     cy.wait(1000);
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
    //     });

    //     cy.get('.ant-upload').first().click({ force: true });
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //     cy.wait(1000);
    //     // Upload hình ảnh
    //     cy.get('.ant-upload').first().click({ force: true });
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //     cy.wait(1000);

    //     // Kiểm tra hình ảnh đã được tải lên
    //     cy.get('img[alt="uploaded"]').should('be.visible');
    //     // Xóa hình ảnh đã tải lên
    //     cy.get('.delete-icon').click({ force: true });
    //     cy.wait(1000);
    //     // Kiểm tra hình ảnh đã bị xóa
    //     cy.get('img[alt="uploaded"]').should('not.exist');

    //     cy.wait(1000);
    //     cy.contains('Thành phần').click();

    //     cy.get("label")
    //         .contains("Hàng hóa thành phần")
    //         .parent()
    //         .find('.ant-select-selection-search-input')
    //         .click({ force: true });

    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Dgh').click();
    // });
    // it("Tắt chi nhánh ( Thêm hàng hóa)", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();
    //     cy.wait(1000);
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
    //     });

    //     cy.get('.ant-upload').first().click({ force: true });
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //     cy.wait(1000);
    //     // Upload hình ảnh
    //     cy.get('.ant-upload').first().click({ force: true });
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //     cy.wait(1000);

    //     // Kiểm tra hình ảnh đã được tải lên
    //     cy.get('img[alt="uploaded"]').should('be.visible');
    //     cy.wait(1000);
    //     cy.contains('Thành phần').click();

    //     cy.get("label")
    //         .contains("Hàng hóa thành phần")
    //         .parent()
    //         .find('.ant-select-selection-search-input')
    //         .click({ force: true });
    // // Chuyển sang tab thành phần
    //     cy.get('.ant-select-dropdown').should('be.visible');
    //     cy.contains('.ant-select-item-option-content', 'Dgh').click();
    //     cy.wait(1000);
    //   // Chuyển sang tab chi nhánh
    //     cy.get('.sc-dqMHui > :nth-child(4)').click();
    //     cy.get(':nth-child(1) > [style="text-align: right;"] > .ant-switch > .ant-switch-inner').click();

    //     // Tiếp tục quy trình thêm hàng
    //     // cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
    // })


    // it("Thêm mô tả chi tiết", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');

    //     cy.contains('Hàng hoá').trigger('mouseover');
    //     cy.contains('Danh mục').should('be.visible').click();
    //     cy.url().should('include', '/products/product-list');

    //     cy.contains('span', 'Thêm').closest('button').click();
    //     //Thêm hàng hóa chế biến
    //     cy.contains('Thêm hàng chế biến').click();
    //     cy.wait(1000);
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
    //     });

    //     cy.get('.ant-upload').first().click({ force: true });
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //     cy.wait(1000);
    //     // Upload hình ảnh
    //     cy.get('.ant-upload').first().click({ force: true });
    //     cy.get('input[type="file"]').first().selectFile('cypress/fixtures/image.jpg', { force: true });
    //     cy.wait(1000);

    //     // Kiểm tra hình ảnh đã được tải lên
    //     cy.get('img[alt="uploaded"]').should('be.visible');
    //     // Xóa hình ảnh đã tải lên
    //     cy.get('.delete-icon').click({ force: true });
    //     cy.wait(1000);
    //     // Kiểm tra hình ảnh đã bị xóa
    //     cy.get('img[alt="uploaded"]').should('not.exist');

    //     cy.wait(1000);
    //     //Chuyển sang tab thứ 2 : tab Mô tả chi tiết
    //     cy.get('.sc-dqMHui > :nth-child(2)').click();
    //     cy.get('.se-wrapper-wysiwyg').should('be.visible');

    //     cy.generateRandomProcessedProduct().then(item => {
    //     cy.get('.se-wrapper-wysiwyg').type(item.description);
    //     })
    // })  
    it("Xem chi tiết hàng hóa",()=>{
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');

        cy.contains('Hàng hoá').trigger('mouseover');
        cy.contains('Danh mục').should('be.visible').click();
        cy.url().should('include', '/products/product-list');

        // Nhấp vào hàng hóa đã thêm
        cy.get('[data-row-key="bb46f966-b70b-4e3e-b3d7-1dbb4b7528e9"] > :nth-child(1) > .ant-typography > div').click({ force: true });
        cy.wait(2000);
        // Tìm và chọn hàng có mã bắt đầu bằng SP
        cy.contains("button", "Bỏ qua").click();
        cy.wait(1000);
       
    })
});


