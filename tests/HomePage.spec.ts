import {test, expect} from '@playwright/test';

import {POManager} from '../pageobjects/POManager.ts';
import config from '../playwright.config.ts';



test(`@Web TC001_Validate home page`, async ({page})=>
  {
    const poManager = new POManager(page);
  
    const launchPage = poManager.getLaunchPage();
    await launchPage.goTo();

    await launchPage.clickHomeMenu();

    const loginPage = poManager.getLoginPage();
    expect.soft(await loginPage.getBrandNameText()).toContain("BlazeDemo");
    
  });
