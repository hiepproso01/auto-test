/// <reference types="cypress" />

describe("Sửa và xóa mã giảm giá", () => {
    beforeEach(() => {
        cy.login();
    });

    it("Sửa mã giảm giá hợp lệ", () => {
        cy.visit("/overviews/overview-list");
        cy.get('body').should('be.visible');
        cy.contains('Ưu đãi').trigger('mouseover');
        cy.wait(500); // Đợi hiệu ứng hover
        cy.contains('Ưu đãi').click();
        cy.contains('Quản lý voucher').trigger('mouseover');
        cy.wait(500); // Đợi hiệu ứng hover
        cy.contains('Quản lý voucher').click();
        cy.get('[data-row-key="684367d2-1efc-4b2c-a87c-e395fcb27003"] > :nth-child(1) > .ant-typography')
        .click();
        cy.wait(1000);

        cy.generateRandomVoucher().then(item => {
            item.selectedDays.forEach(dayInfo => {
                // Chọn checkbox cho ngày
                cy.contains(dayInfo.day)
                  .parent()
                  .scrollIntoView()
                  .find('input[type="checkbox"]')
                  .check({ force: true });
        
                // Nhập số lượng voucher cho ngày đó
                cy.get(`#${dayInfo.id}`)
                  .scrollIntoView()
                  .clear()
                  .type(dayInfo.quantity);
              });

        cy.get('.sc-gTNDMC > .ant-btn-primary').click();
        })
    })
    // it("Xóa mã giảm giá hợp lệ", () => {
    //     cy.visit("/overviews/overview-list");
    //     cy.get('body').should('be.visible');
    //     cy.contains('Ưu đãi').trigger('mouseover');
    //     cy.wait(500); // Đợi hiệu ứng hover
    //     cy.contains('Ưu đãi').click();
    //     cy.contains('Quản lý voucher').trigger('mouseover');
    //     cy.wait(500); // Đợi hiệu ứng hover
    //     cy.contains('Quản lý voucher').click();
        

    //     cy.get('.sc-jSOf').scrollIntoView().click();
    //     cy.get('.sc-jEbSJj').click();
    // })

});






