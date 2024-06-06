import {test, expect,Locator,Page} from '@playwright/test';
import config from '../playwright.config.ts';


export class LaunchPage {
    travelTheWorldMenu : Locator;
    homeMenu: Locator;
    heading1: Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.travelTheWorldMenu= page.locator("a[href='index.php']");
    this.homeMenu = page.locator("a[href='index.php']");
    this.heading1 = page.locator("body div div h1");
}

async goTo()
{
    await this.page.goto(config.baseUrl);
    await this.page.waitForLoadState('networkidle');
}

async clickTravelTheWorldMenu()
{
    await this.travelTheWorldMenu.click();
}

async clickHomeMenu()
{
    await this.homeMenu.click();
}

async getHeading1Text() {
    return await this.heading1.textContent();
}


}
module.exports = {LaunchPage};