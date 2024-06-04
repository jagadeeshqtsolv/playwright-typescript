// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries :0,
  workers: 3,
  fullyParallel: true,
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'chromium',
    headless : false,
    ignoreHTTPSErrors: true,
		screenshot: `only-on-failure`,
		video: `retain-on-failure`,
		trace: `retain-on-failure`
  },


};

module.exports = config;
