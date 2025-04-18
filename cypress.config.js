const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'eipvxm',
  e2e: {
    experimentalWebKitSupport: true, // Hỗ trợ WebKit cho các trình duyệt như Safari
    baseUrl: 'http://localhost:5173/', // URL của ứng dụng Arena Admin Web
    setupNodeEvents(on, config) {
      // Các cấu hình event nếu cần
    },
  },
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 10000, // Tăng timeout vì có thể có API gọi chậm
  chromeWebSecurity: false, // Nếu cần test trên các domain khác nhau
  experimentalCloudSupport: true,
});