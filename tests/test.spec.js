import { test,expect } from "@playwright/test";

test("This is my first test case", async({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const title = await page.title();
   console.log(title);
   await expect(page).toHaveTitle(title);

});

test("Practising the locator", async({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page.locator("[id='username']").fill("Prakash Singh Rajput");
   await page.locator("[id='password']").fill("testingtest");
   await page.locator("[id='terms']").click();
   await page.locator("[id='signInBtn']").click();

   const error =await  page.locator("div[style*='block']").textContent();
  console.log("The error message is: "+error);

   await expect(error).toContain("Incorrect username/password.");
  //expect(error.textContent).toContain("Empty username/password.");
   
   await page.pause();
});

test("Loing with Vlaid creds", async({browser})=>
     {
        const context = await browser.newContext();
        const page  = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
         const getuser = await page.locator("p[class='text-center text-white']").textContent();
        const username = getuser.split("and")[0].split("is")[1].trim();
        console.log(username);

        const pwd = getuser.split("and")[1].split("is")[1].split(")")[0].trim();
        console.log(pwd);

        await page.locator("#username").fill(username);
        await page.locator("#password").fill(pwd);
         await page.locator("#terms").click();
         await page.locator("#signInBtn").click();
         await page.pause();


     }
);

test("Extract Multiple WebElement", async({browser})=>
     {
         const context = await browser.newContext();
         const page = await context.newPage();

         await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
         const getuser = await page.locator("p[class='text-center text-white']").textContent();
        const username = getuser.split("and")[0].split("is")[1].trim();
        console.log(username);

        const pwd = getuser.split("and")[1].split("is")[1].split(")")[0].trim();
        console.log(pwd);

        await page.locator("#username").fill(username);
        await page.locator("#password").fill(pwd);
         await page.locator("#terms").click();
         await page.locator("#signInBtn").click();

        /* const fstprd = await page.locator(".card-body h4").first().textContent();
         console.log(fstprd.trim());

         const allprd = await page.locator(".card-body h4").nth(1).textContent();
         console.log(allprd.trim());*/

         await page.pause();

         await page.locator(".card-body h4").last().waitFor();
         const allprd = await (await page.locator(".card-body h4").allTextContents())
         .map(product => product.trim());
         console.log("All Products are: "+allprd);



     }
);

test("Assertions for chkbox, Dropdown", async({browser})=>
     {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator(".checkmark").nth(1).click();
        await page.locator("#okayBtn").click();

        await expect(page.locator(".checkmark").nth(1)).toBeChecked();

        const drpdwn =  page.locator("select[class = 'form-control']");
        await drpdwn.selectOption("consult");

        await expect(page.locator("select[class = 'form-control']")).toHaveValue("consult");
          
      // await page.locator("#terms").click();

       expect(page.locator("#terms")).not.toBeChecked();
          // await page.pause();
		  //commented paush the update Commands
		  //this is the git testing
           
        //this is the develop branch commit

        const blink = page.locator("a[href*='documents-request']");
        await expect(blink).toHaveAttribute("class","blinkingText");
        await page.pause();



     }  
);

test.only("Handling the child window", async({browser})=>
  {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   const blink = page.locator("a[href*='documents-request']");
        await expect(blink).toHaveAttribute("class","blinkingText");
        
        //execution of below program is from right to left
        const [page2] = await Promise.all([context.waitForEvent("page"),blink.click()]); 
         const childtitle = await page2.title();
        console.log(childtitle);

        const parentpage = await page.title();
        console.log(parentpage);

        const childtitlee = await page2.title();
        console.log(childtitlee);

        const user = await page2.locator(".red").textContent()
        const usern = user.split("at")[1].split("with")[0].trim();
        console.log(usern);

        const userenter = page.locator("input[id='username']");
        await userenter.fill(usern);
        console.log("The enterd text is: "+await userenter.inputValue());

  }
);
