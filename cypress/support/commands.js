// Command đăng nhập (nếu cần)
Cypress.Commands.add('login', (branch="arena", username = 'nhanvien1', password = '123456') => {
  cy.session([branch, username, password], () => {
    cy.visit('/signin');
    cy.get('form').should('be.visible', { timeout: 10000 });
    cy.get('input[placeholder="Brand"]').type(branch);
    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('button[type="submit"]').click();
    // Kiểm tra đăng nhập thành công
    cy.url().should('include', '/overviews/overview-list', { timeout: 15000 });
  });
});
