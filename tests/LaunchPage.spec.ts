import {test, expect} from '@playwright/test';

import {POManager} from '../pageobjects/POManager.ts';
import config from '../playwright.config.ts';



test(`@Web TC001_Validate home page`, async ({page})=>
  {
    const poManager = new POManager(page);
  
    const launchPage = poManager.getLaunchPage();
    await launchPage.goTo();

    expect(await launchPage.getHeading1Text()).toBe("Welcome to the Simple Travel Agency!");
    
     });