const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // projectId: 'eipvxm',
  projectId:'5npuu4',
  e2e: {
    
    experimentalWebKitSupport: true, // Hỗ trợ WebKit cho các trình duyệt như Safari
    baseUrl: 'http://localhost:5173/', // URL của ứng dụng Arena Admin Web
    setupNodeEvents(on, config) {
      config.env = config.env || {};
      config.env.apiUrl = 'https://dev-arena4club-api.arenabilliard.com';
      return config;
    },
  },
  scrollBehavior: false,  // Hoặc 'center', 'top', 'bottom', 'nearest'
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000, // Tăng timeout vì có thể có API gọi chậm
  chromeWebSecurity: false, // Nếu cần test trên các domain khác nhau
  experimentalCloudSupport: true,
});