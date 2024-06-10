const automationType = process.env.AUTOMATION_TYPE || 'web';;
let testDir = './tests';

if (automationType === 'api') {
  testDir = './tests-api';
}


export const globalConfig = {
    testDir: process.env.TEST_DIR || testDir,
    retries: parseInt(process.env.RETRIES ?? '0', 10) || 1,
    workers: parseInt(process.env.WORKERS ?? '3', 10) || 3,

    fullyParallel: process.env.FULLY_PARALLEL === 'true',
    timeout: parseInt(process.env.TIMEOUT ?? '30000', 10),
    expect: {
      timeout: parseInt(process.env.EXPECT_TIMEOUT ?? '5000', 10),

    },
    reporter: process.env.REPORTER || 'html',
    use: {
      browserName: process.env.BROWSER_NAME || 'chromium',
      headless: process.env.HEADLESS === 'true',
      ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
      screenshot: process.env.SCREENSHOT || 'only-on-failure',
      video: process.env.VIDEO || 'retain-on-failure',
      trace: process.env.TRACE || 'retain-on-failure'
    }
  };
  