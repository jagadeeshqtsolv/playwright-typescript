
import {LoginPage} from './LoginPage';
import {Page} from '@playwright/test';
import { LaunchPage } from './LaunchPage';

export class POManager
{
    loginPage: LoginPage;
    launchPage: LaunchPage;
    page : Page;


constructor(page:Page)
{
    this.page = page;
    this.launchPage = new LaunchPage(this.page);
    this.loginPage = new LoginPage(this.page);

}

getLoginPage()
{
    return this.loginPage;
}


getLaunchPage()
{
    return this.launchPage;
}

}
module.exports = {POManager};