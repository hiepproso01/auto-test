import { faker } from '@faker-js/faker';

// Command để tạo dữ liệu sản phẩm chế biến ngẫu nhiên
Cypress.Commands.add('generateRandomProcessedProduct', () => {
  return {
    name: `${faker.commerce.productName()}`,
    code: `SP${faker.string.numeric(6)}`,
    price: faker.number.int({ min: 10000, max: 500000 }),
    demical: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
    description: faker.lorem.sentence(),
    isProcessed: true,
    ingredients: [
      {
        name: `Nguyên liệu ${faker.string.alphanumeric(4)}`,
        quantity: faker.number.int({ min: 1, max: 10 }),
        unit: 'cái'
      },
      {
        name: `Nguyên liệu ${faker.string.alphanumeric(4)}`,
        quantity: faker.number.int({ min: 1, max: 5 }),
        unit: 'kg'
      }
    ]
  };
});
