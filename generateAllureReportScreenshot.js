const { chromium } = require('playwright');
const path = require('path');
const express = require('express');
const http = require('http');

// Function to start the Express server
const startServer = () => {
    return new Promise((resolve, reject) => {
        const app = express();
        const server = http.createServer(app);

        app.use(express.static(path.resolve(__dirname, './allure-report')));

        server.listen(9090, () => {
            console.log('Server started on http://localhost:9090');
            resolve(server);
        });

        server.on('error', (err) => {
            reject(err);
        });
    });
};

// Function to stop the Express server
const stopServer = (server) => {
    server.close();
};

(async () => {
    const server = await startServer();
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:9090/index.html');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'reportscreenshot.png' });
    await browser.close();
    stopServer(server);
})();
