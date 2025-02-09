import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { Page, Browser, chromium, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

// ✅ Set the default timeout to 30 seconds
setDefaultTimeout(30000);

// ✅ Step 1: Open the SauceDemo login page
Given("I open the SauceDemo login page", { timeout: 30000 }, async function () {
    browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });

    const context = await browser.newContext();
    await context.tracing.start({ screenshots: true, snapshots: true });

    page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
});

// ✅ Step 2: Enter valid login credentials
When("I enter valid credentials", { timeout: 30000 }, async function () {
    await page.fill('input[data-test="username"]', "standard_user");
    await page.fill('input[data-test="password"]', "secret_sauce");
});

// ✅ Step 3: Enter invalid login credentials
When("I enter invalid credentials", { timeout: 30000 }, async function () {
    await page.fill('input[data-test="username"]', "wrong_user");
    await page.fill('input[data-test="password"]', "wrong_pass");
});

// ✅ Step 4: Click the login button
When("I click the login button", { timeout: 30000 }, async function () {
    await page.click('input[data-test="login-button"]');
});

// ✅ Step 5: Verify successful login
Then("I should see the inventory page", { timeout: 30000 }, async function () {
    await page.waitForSelector(".inventory_list", { timeout: 10000 });
    expect(await page.url()).toContain("inventory.html");

    await page.pause();
    await page.context().tracing.stop({ path: "trace.zip" });
    await browser.close();
});

// ✅ Step 6: Verify error message for invalid login
Then("I should see an error message", { timeout: 30000 }, async function () {
    await page.waitForSelector("h3[data-test='error']", { timeout: 10000 });
    const errorMessage = await page.textContent("h3[data-test='error']");
    expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");

    await page.pause();
    await page.context().tracing.stop({ path: "trace.zip" });
    await browser.close();
});
