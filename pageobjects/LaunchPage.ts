import {test, expect,Locator,Page} from '@playwright/test';
import config from '../playwright.config';


export class LaunchPage {
    travelTheWorldMenu : Locator;
    homeMenu: Locator;
    heading1: Locator;
    selectDeparture: Locator;
    selectDestination: Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.travelTheWorldMenu= page.locator("a[href='index.php']");
    this.homeMenu = page.locator("a[href='home']");
    this.heading1 = page.locator("body div div h1");
    this.selectDeparture = page.locator("select[name='fromPort']");
    this.selectDestination = page.locator("select[name='toPort']");
}

async goTo()
{
    await this.page.goto(config.baseUrl);
    await this.page.waitForLoadState('networkidle');
}

async clickTravelTheWorldMenu()
{
    await this.travelTheWorldMenu.click();
    await this.page.waitForLoadState('networkidle');
}

async clickHomeMenu()
{
    await this.homeMenu.click();
    await this.page.waitForLoadState('networkidle');
}

async getHeading1Text() {
    return await this.heading1.textContent();
}

async getTravelTheWorldMenuText() {
    return await this.travelTheWorldMenu.textContent();
}

async getHomeMenuText() {
    return await this.homeMenu.first().textContent();
}

async selectDepartureDropDown(departure:string) {
    await this.selectDeparture.selectOption(departure);
}

async selectDestinationDropDown(destination:string) {
    await this.selectDestination.selectOption(destination);
}

async getSelectDepartureDropDownText() {
    return await this.selectDeparture.textContent();
}

async getSelectDestinationDropDownText() {
    return await this.selectDestination.textContent();
}


}
module.exports = {LaunchPage};