const { faker } = require('@faker-js/faker');

// Ngày ngẫu nhiên từ 1 đến 30
const randomDay = Math.floor(Math.random() * 30) + 1;

/**
 * Tạo dữ liệu nhân viên ngẫu nhiên
 * @returns {Object} Thông tin nhân viên ngẫu nhiên
 */
function generateRandomEmployee() {
  return {
    fullName: `${faker.person.lastName()} ${faker.person.firstName()}`,
    phone: faker.phone.number('0#########'),
    code: `NV${faker.string.numeric(6)}`,
    identityCard: faker.string.numeric(9),
    birthday: faker.date.past({ years: 30 }).toISOString().split('T')[0],
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
  };
}

module.exports = { 
  randomDay,
  generateRandomEmployee 
};