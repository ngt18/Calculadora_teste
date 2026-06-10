const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/calculator.cy.js",
    setupNodeEvents(on, config) {},
    webServer: {
      command: "npx -y vite --port 5173",
      url: "http://localhost:5173",
      timeout: 120000,
      reuseExistingServer: true,
    },
  },
});
