import { defineConfig } from '@playwright/test';

module.exports = defineConfig({
  testDir: './playwright-tests',  // Thư mục riêng cho Playwright tests
  use: {
    // chế độ headless nói cho dễ hiểu là chạy không có giao diện người dùng
    headless: false, // Chạy ở chế độ không headless để dễ dàng theo dõi
    baseURL: 'http://localhost:5173/',  // Dùng cùng baseUrl như Cypress
    // cấu hình để lưu video và screenshot
    
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  reporter: [
    ['html', { open: 'never' }]  // 'never' có nghĩa là không tự động mở report sau khi chạy test
  ],
  projects: [
    {
      name: 'Chrome',
      use: { 
        browserName: 'chromium',
        channel: 'chrome' // Sử dụng Chrome đã cài đặt trên máy
      },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'Safari',
    //   use: { browserName: 'webkit' },
    // }
  ],
});