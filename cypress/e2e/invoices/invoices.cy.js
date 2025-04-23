/// <reference types="cypress" />

describe("Tìm kiếm theo bộ lọc tiêu chí", () => {
    beforeEach(() => {
        cy.login();
       
    });
    // it("Tìm kiếm theo tên và xuất file",()=>{
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');
    //     cy.contains('Giao dịch').trigger('mouseover');
    //     cy.contains('Hóa đơn').should('be.visible').click();
    //     cy.url().should('include', '/transactions/invoices');
    //     cy.get('.sc-bOA-dso > .ant-select > .ant-select-selector > .ant-select-selection-item')
    //     .click();
    //     cy.get('body')
    //     .find('.ant-select-dropdown .ant-select-item-option')
    //     .contains('7 ngày qua')
    //     .click();
    //     cy.wait(2000);
    //     cy.contains('span', 'Xuất file').closest('button').click();
    //     cy.wait(1000);
    // })
    it("Xem chi tiết hóa đơn",()=>{
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Giao dịch').trigger('mouseover');
        cy.contains('Hóa đơn').should('be.visible').click();
        cy.url().should('include', '/transactions/invoices');
        // Chọn khoảng thời gian 7 ngày qua
        cy.get('.sc-bOA-dso > .ant-select > .ant-select-selector > .ant-select-selection-item')
        .click();
        cy.get('body')
        .find('.ant-select-dropdown .ant-select-item-option')
        .contains('7 ngày qua')
        .click();
        cy.wait(2000);
        cy.get('[data-row-key="45aa16ec-b7e3-4db5-a990-4d2a2a3a690d"] > :nth-child(1) > .ant-typography')
        .click() 
        cy.wait(2000);
        cy.get('.ant-modal-close').click();
        cy.wait(2000);
    })

    
    
});