import { defineConfig } from "cypress";
import mochawesomeReporter from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress TS Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports',
    reportFilename: 'cypress-ts-test-report',
    html: true,
    json: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      mochawesomeReporter(on);
      return config;
    },
    specPattern: 'cypress/e2e-tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',
});
