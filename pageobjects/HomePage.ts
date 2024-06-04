import {test, expect,Locator,Page} from '@playwright/test';


export class HomePage {
    jobsMenu : Locator;
    companiesMenu: Locator;

    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.jobsMenu= page.locator("a[title='Recommended Jobs']");
    this.companiesMenu = page.locator("a[title='Explore top companies hiring on Naukri']");
}

async clickJobsMenu()
{
    await this.jobsMenu.click();
}


async clickCompaniesMenu()
{
    await this.companiesMenu.click();
}

async getPageTitle(){
    await this.page.title();
}

}
module.exports = {HomePage};