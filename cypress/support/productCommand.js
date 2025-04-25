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

Cypress.Commands.add('generateRandomVoucher', () => {
  const daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
  const dayOfWeekVoucher = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const dayToId = {
    'T2': 'Monday',
    'T3': 'Tuesday',
    'T4': 'Wednesday',
    'T5': 'Thursday',
    'T6': 'Friday',
    'T7': 'Saturday',
    'CN': 'Sunday'
  };
   const numberOfDays = faker.number.int({ min: 2, max: 4 });
   let selectedDays = [...dayOfWeekVoucher]
     .sort(() => 0.5 - Math.random()) // Xáo trộn ngẫu nhiên
     .slice(0, numberOfDays) // Lấy số lượng cần thiết
     .map(day => ({
       day,
       id: `issued${dayToId[day]}Quantity`, // ID của input
       quantity: faker.number.int({ min: 10, max: 50 }) // Số lượng random cho mỗi ngày
     }));
  return{
    code: `MA-GIAM-GIA-${faker.string.numeric(6)}`,
    name: `Mã giảm giá tự động ${faker.string.numeric(6)}`,
    maxDiscount: faker.number.int({ min: 10000, max: 500000 }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    price: faker.number.int({ min: 10000, max: 500000 }),
    randomDay: daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)],
    randomDayVoucher: dayOfWeekVoucher[Math.floor(Math.random() * dayOfWeekVoucher.length)],
    selectedDays: selectedDays
  }
});