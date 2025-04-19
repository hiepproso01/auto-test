/// <reference types="cypress" />
import {de, faker} from '@faker-js/faker';

const randomDay = Math.floor(Math.random() * 30) + 1; // Ngày ngẫu nhiên từ 1 đến 30
Cypress.faker = faker;
Cypress.Commands.add('generateRandomEmployee', () => {
    return {
      fullName: `${faker.person.lastName()} ${faker.person.firstName()}`,
      phone: faker.phone.number('0#########'),
      code: `NV${faker.string.numeric(6)}`,
      identityCard: faker.string.numeric(9),
      birthday: faker.date.past({ years: 30}).toISOString().split('T')[0],
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
    };
  });

describe('Chức năng thêm mới nhân viên', () => {
    beforeEach(() => {
      cy.login();
      cy.openAddEmployeeModal();
    });
  
    // it('Đăng nhập và mở Modal thêm nhân viên', () => {
    //     cy.get('input[placeholder="Nhập tên nhân viên"]').should('exist');
    //     cy.get('input[placeholder="Nhập số điện thoại"]').should('exist');
    //     cy.contains('button', 'Thêm').should('be.visible');
    //     cy.contains('button', 'Bỏ qua').should('be.visible');
    // });
  
    // it('Thêm nhân viên mới', () => {
    //     cy.generateRandomEmployee().then((employee) => {
    //       cy.get('input[placeholder="Nhập tên nhân viên"]').type(employee.fullName);
    //       cy.get('input[placeholder="Nhập số điện thoại"]').type(employee.phone);
          
    //       if (Cypress.$('input[placeholder="Mã mặc định"]').length > 0) {
    //         cy.get('input[placeholder="Mã mặc định"]').clear().type(employee.code);
    //       }
          
    //       cy.contains('Chi nhánh trả lương').parent().find('.ant-select-selector').click({force: true});
    //       cy.get('.ant-select-dropdown').should('be.visible');
    //       cy.contains('.ant-select-item-option', '3C 612 QL13').click();
          
    //       cy.contains('button', 'Thêm thông tin').click({force: true});
    //       cy.wait(2000);
          
    //       cy.get('input[placeholder="Nhập số CMND/CCCD"]').type(employee.identityCard);
          
    //       cy.get('input[placeholder="Chọn ngày"]').click();
    //       cy.get('.ant-picker-dropdown').should('be.visible');
    //       cy.get('.ant-picker-cell-in-view').contains(randomDay.toString()).click();

    //       cy.get('input[placeholder="Nhập địa chỉ"]').type(employee.address);
    //       cy.get('input[placeholder="Nhập Email"]').type(employee.email);
          
    //       cy.contains('button[type="submit"]', 'Thêm').click({ force: true });
    //       cy.get('.ant-message-success', { timeout: 10000 }).should('be.visible');
          
    //       cy.visit('/staff/staffs-list');
    //       cy.get('input[placeholder="Theo tên nhân viên"]').type(`${employee.fullName}{enter}`);
    //       cy.contains(employee.fullName).should('be.visible');
    //     });
    //   });
  
    //   it('Tìm kiếm nhân viên ngẫu nhiên', () => {
    //     cy.login();
    //     cy.visit('/staff/staffs-list');
    //     cy.get('body').should('be.visible', { timeout: 15000 });
        
    //     const searchText = Cypress.faker.person.lastName();
    //     cy.get('input[placeholder="Theo tên nhân viên"]').type(`${searchText}{enter}`);
    //     cy.wait(5000);
    //   });
  
    it('Kiểm tra trường hợp nhập mã nhân viên bị trùng', () => {
        cy.get
        cy.fixture('employee-data').then((data) => {
            cy.generateRandomEmployee().then((employee) => {
              cy.get('input[placeholder="Mã mặc định"]').clear().type(data.existingCode);
              cy.get('input[placeholder="Nhập tên nhân viên"]').click();
              cy.contains('Mã nhân viên đã tồn tại').should('be.visible');
              
              cy.get('input[placeholder="Mã mặc định"]').clear().type(employee.code);
              cy.contains('Mã nhân viên đã tồn tại').should('not.exist');
              
              cy.get('input[placeholder="Nhập tên nhân viên"]').type(employee.fullName);
              cy.get('input[placeholder="Nhập số điện thoại"]').type(employee.phone);
            });
          });
    });
  
      // it('Lọc nhân viên theo trạng thái', () => {
      //   cy.login();
      //   cy.visit('/staff/staffs-list');
      //   cy.get('body').should('be.visible', { timeout: 15000 });
        
      //   // Lọc "Đang làm việc"
      //   cy.contains('Đang làm việc').parent().find('.ant-checkbox-input').click({force: true});
      //   cy.wait(2000);
      //   cy.contains('Đang làm việc').should('be.visible');
        
      //   // Bỏ chọn "Đang làm việc"
      //   cy.contains('Đang làm việc').parent().find('.ant-checkbox-input').click({force: true});
      //   cy.wait(2000);
        
      //   // Lọc "Đã nghỉ"
      //   cy.contains('Đã nghỉ').parent().find('.ant-checkbox-input').click({force: true});
      //   cy.wait(2000);
      //   cy.contains('Đã nghỉ').should('be.visible');
        
      //   // Bỏ chọn "Đã nghỉ"
      //   cy.contains('Đã nghỉ').parent().find('.ant-checkbox-input').click({force: true});
      //   cy.wait(2000);
        
      //   // Kiểm tra bật/tắt lọc
      //   cy.contains('Đang làm việc').parent().find('.ant-checkbox-input').click({force: true});
      //   cy.wait(2000);
      //   cy.contains('Đang làm việc').parent().find('.ant-checkbox-input').click({force: true});
      //   cy.wait(2000);
      // });
  
      it('Xem chi tiết nhân viên khi click vào mã nhân viên', () => {
        cy.login();
        cy.visit('/staff/staffs-list');
        cy.get('body').should('be.visible', { timeout: 15000 });
        
        cy.get('td').filter(':contains("NV"), :contains("ABC")').then($cells => {
            const randomIndex = Math.floor(Math.random() * $cells.length);
            cy.wrap($cells[randomIndex]).click();
          });
        cy.wait(2000);
        
        cy.get('.ant-modal-content', { timeout: 10000 }).should('be.visible');
        cy.contains('Thông tin nhân viên').should('be.visible');
        
        // Nhấn vào nút "Ngừng làm việc"
        cy.contains('button', 'Ngừng làm việc').click();
        cy.wait(2000); // Đợi 2 giây để xác nhận hành động
        cy.contains('Xác nhận ngừng làm việc').should('be.visible');
        cy.contains('button', 'Đồng ý').click();
        cy.get('.ant-message-success', { timeout: 5000 }).should('be.visible');
       
      });
   

})