import {test, expect,Locator,Page} from '@playwright/test';


export class LoginPage {
    emailId :Locator;
    password : Locator;
    signInbutton : Locator;
    brandName: Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.emailId = page.locator("#email");
    this.password = page.locator("#password");
    this.signInbutton= page.locator("button[type='submit']");
    this.brandName = page.locator("a[class='navbar-brand']");

}


async validLogin(username:string,password:string)
{ 
    await  this.emailId.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');

}

async getBrandNameText() {
    return await this.brandName.first().textContent();
}

async getPageTitle() {
    return this.page.title();
}


}
module.exports = {LoginPage};