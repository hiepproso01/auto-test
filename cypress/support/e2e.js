import './commands';
import './productCommand';
// before(() => {
//     // Login và lưu token cho các API calls
//     cy.request({
//       method: 'POST',
//       url: 'https://dev-arena4club-api.arenabilliard.com/api/app/auth/login',
//       body: {
//         branch: Cypress.env('arena'),
//         username: Cypress.env('admin'),
//         password: Cypress.env('123456')
//       }
//     }).then((response) => {
//       Cypress.env('token', response.body.token);
//     });
//   });