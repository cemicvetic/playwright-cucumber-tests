import { Given, When, Then } from "@cucumber/cucumber";
import { Page, Browser, chromium, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

// Open the SauceDemo login page
Given("I open the SauceDemo login page", async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.saucedemo.com/");
});

// Enter valid credentials
When("I enter valid credentials", async function () {
    await page.fill('input[data-test="username"]', "standard_user");
    await page.fill('input[data-test="password"]', "secret_sauce");
});

// Enter invalid credentials
When("I enter invalid credentials", async function () {
    await page.fill('input[data-test="username"]', "wrong_user");
    await page.fill('input[data-test="password"]', "wrong_pass");
});

// Click the login button
When("I click the login button", async function () {
    await page.click('input[data-test="login-button"]');
});

// Verify successful login
Then("I should see the inventory page", async function () {
    await page.waitForSelector(".inventory_list");
    expect(await page.url()).toContain("inventory.html");
    //await browser.close();
});

// Verify unsuccessful login
Then("I should see an error message", async function () {
    await page.waitForSelector("h3[data-test='error']");
    const errorMessage = await page.textContent("h3[data-test='error']");
    expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
   // await browser.close();
});
