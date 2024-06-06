import {test, expect,Locator,Page} from '@playwright/test';


export class LoginPage {
    emailId :Locator;
    password : Locator;
    signInbutton : Locator;
    errorMessage: Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.emailId = page.getByPlaceholder("Enter your active Email ID / Username");
    this.password = page.getByPlaceholder("Enter your password");
    this.signInbutton= page.locator("button[type='submit']");
    this.errorMessage = page.locator("div[class='server-err']");

}


async validLogin(username:string,password:string)
{ 
    await  this.emailId.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');

}

async getErrorMessage() {
    return await this.errorMessage.textContent();
}

}
module.exports = {LoginPage};