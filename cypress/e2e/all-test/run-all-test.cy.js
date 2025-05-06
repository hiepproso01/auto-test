beforeEach(() => {
    cy.login();
});

describe('Run All Tests', () => {
    // Import tất cả các test files trong thư mục all-test
    // require('./01-add-product.cy.js');
    // require('./02-add-processed.cy.js');
    // require('./03-add-combo.cy.js');
    // require('./04-add-service.cy.js');
    // require('./05-edit-product.cy.js');
    // require('./06-delete-product.cy.js');
    require('./07-filter-product.cy.js');
    // Import thêm các file khác nếu cần
  });