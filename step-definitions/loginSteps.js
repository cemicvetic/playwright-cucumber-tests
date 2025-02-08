const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
import { expect } from 'chai';


let browser, page;

// Step 1: Open the OrangeHRM login page
Given('I navigate to the OrangeHRM login page', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

// Step 2: Enter valid credentials
When('I enter valid credentials', async function () {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
});

// Step 3: Enter invalid credentials
When('I enter invalid credentials', async function () {
    await page.fill('input[name="username"]', 'invalidUser');
    await page.fill('input[name="password"]', 'wrongPass');
});

// Step 4: Click the login button
When('I click the login button', async function () {
    await page.click('button[type="submit"]');
});

// Step 5: Verify successful login (dashboard redirection)
Then('I should be redirected to the dashboard', async function () {
    await page.waitForSelector('.oxd-topbar-header-breadcrumb');
    const url = await page.url();
    expect(url).to.include('/dashboard');
    await browser.close();
});

// Step 6: Verify unsuccessful login (error message)
Then('I should see an error message', async function () {
    await page.waitForSelector('.oxd-alert-content');
    const errorText = await page.textContent('.oxd-alert-content');
    expect(errorText).to.include('Invalid credentials');
    await browser.close();
});
