const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const filePath = path.resolve(__dirname, './Allure_20HTML_20Report/index.html');
    await page.goto(`file://${filePath}`);
    await page.screenshot({ path: 'reportscreenshot.png' });
    await browser.close();
})();


