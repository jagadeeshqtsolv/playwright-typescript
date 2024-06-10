import {test, expect} from '@playwright/test';

import {POManager} from '../pageobjects/POManager';
import config from '../playwright.config';



test(`@Web TC001_Validate Launch page`, async ({page})=>
  {
    const poManager = new POManager(page);
  
    const launchPage = poManager.getLaunchPage();
    await launchPage.goTo();

    expect.soft(await launchPage.getHeading1Text()).toBe("Welcome to the Simple Travel Agency!");
    expect.soft(await launchPage.getTravelTheWorldMenuText).toContain("Travel The World");
    expect.soft(await launchPage.getHomeMenuText).toContain("home");  
    
  });


  test(`@Web TC002_Validate departure dropdown`, async ({page})=>
    {
      const poManager = new POManager(page);
    
      const launchPage = poManager.getLaunchPage();
      await launchPage.goTo();
  
      expect.soft(await launchPage.getHeading1Text()).toBe("Welcome to the Simple Travel Agency!");
      
      await launchPage.selectDepartureDropDown('Boston');
      expect.soft(await launchPage.getSelectDepartureDropDownText()).toContain('Boston');
  
    });



  test(`@Web TC003_Validate destination dropdown`, async ({page})=>
    {
      const poManager = new POManager(page);
    
      const launchPage = poManager.getLaunchPage();
      await launchPage.goTo();
  
      expect.soft(await launchPage.getHeading1Text()).toBe("Welcome to the Simple Travel Agency!");
      
      await launchPage.selectDestinationDropDown('London');

      expect.soft(await launchPage.getSelectDestinationDropDownText()).toContain('London');
  
    });


    test(`@Web TC004_Validate departure and destination dropdown`, async ({page})=>
      {
        const poManager = new POManager(page);
      
        const launchPage = poManager.getLaunchPage();
        await launchPage.goTo();
    
        expect.soft(await launchPage.getHeading1Text()).toBe("Welcome to the Simple Travel Agency!");
        
        await launchPage.selectDepartureDropDown('Portland');
        await launchPage.selectDestinationDropDown('Rome');
  
        expect.soft(await launchPage.getSelectDepartureDropDownText()).toContain('Portland');
        expect.soft(await launchPage.getSelectDestinationDropDownText()).toContain('Rome');

        await launchPage.selectDepartureDropDown('Paris');
        await launchPage.selectDestinationDropDown('London');
  
        expect.soft(await launchPage.getSelectDepartureDropDownText()).toContain('Paris');
        expect.soft(await launchPage.getSelectDestinationDropDownText()).toContain('London');
    
      });