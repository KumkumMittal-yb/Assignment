// Question 7

// 7. Avoid hard-coded username and password:
// a. Move the login information into the env config object.




import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },
  video: false,
  screenshotsFolder: 'cypress/reports/mochareports/assets',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl: 'https://www.saucedemo.com',
    pageLoadTimeout: 1200000,
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    chromeWebSecurity: false,
    env: {
      NODE_ENV: "development",
      username: "standard_user",
      password: "secret_sauce"
    },
    requestTimeout: 15000,
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts').default(on, config)
    },
  },
})
