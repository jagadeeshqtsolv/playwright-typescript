import {test, expect} from '@playwright/test';

import {POManager} from '../pageobjects/POManager';

//Json->string->js object
const dataset =  JSON.parse(JSON.stringify(require("../resources/loginTestData.json")));


for(const data of dataset)
{
test(`@Web Naukri App login for ${data.loginType}`, async ({page})=>
{
  const poManager = new POManager(page);

  const launchPage = poManager.getLaunchPage();
  launchPage.goTo();
  launchPage.clickLoginMenu();


   //js file- Login js, DashboardPage
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(data.username,data.password);
    
    const homePage = poManager.getHomePage();
    await homePage.clickJobsMenu();

    expect(homePage.getPageTitle,"Recommended Jobs | Mynaukri");
   
});
}


test(`@Web TC001_Validate login with invalid credentials`, async ({page})=>
  {
    const poManager = new POManager(page);
  
    const launchPage = poManager.getLaunchPage();
    await launchPage.goTo();
    await launchPage.clickLoginMenu();
  
     //js file- Login js, DashboardPage
      const loginPage = poManager.getLoginPage();
      await loginPage.validLogin("test@gmail.com","testpassword");

      expect(await loginPage.getErrorMessage()).toBe("Invalid details. Please check the Email ID - Password combination.");
    
     });

  test(`@Web TC002_Validate login with invalid credentials fail scenario`, async ({page})=>
    {
      const poManager = new POManager(page);
    
      const launchPage = poManager.getLaunchPage();
      await launchPage.goTo();
      await launchPage.clickLoginMenu();
    
       //js file- Login js, DashboardPage
        const loginPage = poManager.getLoginPage();
        await loginPage.validLogin("test@gmail.com","password");
        
        expect(await loginPage.getErrorMessage()).toBe("Invalid details.");
    
    });








