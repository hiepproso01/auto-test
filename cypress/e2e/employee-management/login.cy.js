/// <reference types="cypress" />

beforeEach(() => {
  cy.login();
  cy.openAddEmployeeModal();
});