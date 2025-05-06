/// <reference types="cypress" />


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