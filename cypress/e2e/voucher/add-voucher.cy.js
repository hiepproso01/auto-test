/// <reference types="cypress" />

describe("Thêm mã giảm giá", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Thêm mã giảm giá thành công", () => {
    cy.visit("/overviews/overview-list");
    cy.get('body').should('be.visible');

    cy.contains('Ưu đãi').trigger('mouseover');
    cy.wait(500); // Đợi hiệu ứng hover
    cy.contains('Ưu đãi').click();
    cy.contains('Quản lý voucher').trigger('mouseover');
    cy.wait(500); // Đợi hiệu ứng hover
    cy.contains('Quản lý voucher').click();

    // Nhấn nút "Thêm mã giảm giá"
    cy.contains('.ant-btn', 'Thêm').closest('button').click();
    cy.contains('.ant-dropdown-menu-title-content', 'Tặng món').click();
    cy.wait(1000);
    cy.generateRandomVoucher().then(item => {
      cy.get('input[placeholder="Tên voucher"]').type(item.code);

      cy.get('.ant-form-item-control-input-content > .ant-btn').click();
      cy.get('.sc-ccAZvV > .ant-input-affix-wrapper').type("Trà sữa tươi trân châu");
      cy.get('.sc-ccAZvV > .ant-input-affix-wrapper').type('{enter}');
      cy.get('.sc-ccAZvV > .ant-input-affix-wrapper').parent().find('input[type="checkbox"]').check();
      cy.get('button').contains('Đồng ý').click({ force: true });
      cy.get('.ant-col-6 > .ant-input').clear().type(item.quantity);


      cy.contains('Giảm giá tối đa').parents('.ant-form-item')
        .find('input')
        .clear().type(item.maxDiscount);

      // Chọn điều kiện áp dụng
      cy.contains('Tổng tiền hóa đơn >=')
        .parent()
        .find('input[type="radio"]')
        .check({ force: true });
      cy.get('[style="width: 60%; display: flex; align-items: center;"] > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-space > .ant-space-item > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type(item.price);
      cy.contains(item.randomDay)
        .parent()
        .scrollIntoView()
        .find('input[type="checkbox"]')
        .check();
      // Sử dụng trigger change trực tiếp
      cy.get(':nth-child(3) input[readonly]')
        .then($el => {
          const el = $el[0];
          const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setValue.call(el, '04:00');
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        });

      cy.wait(500);

      cy.get(':nth-child(4) input[readonly]')
        .then($el => {
          const el = $el[0];
          const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setValue.call(el, '22:00');
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        });

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
    });
    // cy.get('.sc-iWeKus > .ant-btn-primary').click();
    cy.wait(1000);

  });

});