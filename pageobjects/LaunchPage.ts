import {test, expect,Locator,Page} from '@playwright/test';
import config from '../playwright.config.ts';


export class LaunchPage {
    loginOption : Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.loginOption= page.locator("#login_Layer");
}

async goTo()
{
    await this.page.goto(config.baseUrl);
    await this.page.waitForLoadState('networkidle');
}

async clickLoginMenu()
{
    await this.loginOption.click();
}

}
module.exports = {LaunchPage};