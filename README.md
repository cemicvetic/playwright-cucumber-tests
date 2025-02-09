# Playwright + Cucumber BDD Testing for SauceDemo

## 🚀 Overview

This project automates the login functionality of SauceDemo using Playwright and Cucumber with TypeScript.

## 📂 Project Structure

```
playwright-cucumber-saucedemo/
├── src/
│   ├── tests/
│   │   ├── features/           # Contains Cucumber feature files
│   │   ├── step-definitions/   # Playwright step definitions
├── tsconfig.json               # TypeScript configuration
├── cucumber.js                 # Cucumber configuration
├── package.json                # Dependencies & scripts
├── README.md                   # Documentation
```

## ✨ 

- Node.js (LTS version)
- Visual Studio Code / WebStorm
- VS Code Extensions (Cucumber, Playwright)

## 🚀 Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/cemicvetic/playwright-cucumber-saucedemo.git
cd playwright-cucumber-saucedemo
npm install
```

## 📝 Writing Tests

### Feature file (`login.feature`)

```gherkin
Feature: SauceDemo Login Functionality

  Scenario: Successful login
    Given I open the SauceDemo login page
    When I enter valid credentials
    And I click the login button
    Then I should see the inventory page

  Scenario: Unsuccessful login
    Given I open the SauceDemo login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message
```

### Step definitions (`login.ts`)

```typescript
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { Page, Browser, chromium, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

setDefaultTimeout(30000);

Given("I open the SauceDemo login page", { timeout: 30000 }, async function () {
    browser = await chromium.launch({ headless: false, slowMo: 500 });
    const context = await browser.newContext();
    await context.tracing.start({ screenshots: true, snapshots: true });

    page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
});

When("I enter valid credentials", { timeout: 30000 }, async function () {
    await page.fill('input[data-test="username"]', "standard_user");
    await page.fill('input[data-test="password"]', "secret_sauce");
});

When("I enter invalid credentials", { timeout: 30000 }, async function () {
    await page.fill('input[data-test="username"]', "wrong_user");
    await page.fill('input[data-test="password"]', "wrong_pass");
});

When("I click the login button", { timeout: 30000 }, async function () {
    await page.click('input[data-test="login-button"]');
});

Then("I should see the inventory page", { timeout: 30000 }, async function () {
    await page.waitForSelector(".inventory_list", { timeout: 10000 });
    expect(await page.url()).toContain("inventory.html");

    await page.pause();
    await page.context().tracing.stop({ path: "trace.zip" });
    await browser.close();
});

Then("I should see an error message", { timeout: 30000 }, async function () {
    await page.waitForSelector("h3[data-test='error']", { timeout: 10000 });
    const errorMessage = await page.textContent("h3[data-test='error']");
    expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");

    await page.pause();
    await page.context().tracing.stop({ path: "trace.zip" });
    await browser.close();
});
```

## 🌟 Running Tests

### Run Cucumber BDD tests

```sh
npm run cucumber
```

## 📊 Test Reports

After running tests, reports are generated in the `reports/` directory:

- **HTML Report:** `reports/cucumber-report.html`
- **JSON Report:** `reports/cucumber-report.json`

To view the HTML report:

```sh
start reports/cucumber-report.html # Windows
open reports/cucumber-report.html  # macOS/Linux
```

## 🔧 Debugging & Troubleshooting

### View Playwright traces

```sh
npx playwright show-trace trace.zip
```

