import {test, expect,Locator,Page} from '@playwright/test';


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
    await this.page.goto("https://www.naukri.com/");
}

async clickLoginMenu()
{
    await this.loginOption.click();
}

}
module.exports = {LaunchPage};