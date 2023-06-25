const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'b8ciwt',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
