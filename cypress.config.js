require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = process.env.CYPRESS_BASE_URL || config.baseUrl;
      config.env = {
        ...process.env,
        ...config.env
      };
      return config;
    }
  }
});
