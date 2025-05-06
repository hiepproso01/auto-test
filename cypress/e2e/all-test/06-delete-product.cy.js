
/// <reference types="cypress" />

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