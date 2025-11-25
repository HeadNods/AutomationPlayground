import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { LoginPage } from "../pages/loginPage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Login page$/,
  async function (this: World) {
    this.loginPage = new LoginPage(this);
    await this.loginPage.navigate();
  }
);

// Attribute assertions
Then(
  /^the username field should have attribute "(.*?)" with value "(.*?)"$/,
  async function (this: World, attribute: string, expectedValue: string) {
    const actualValue = await this.loginPage.getUsernameAttribute(attribute);
    assert.strictEqual(actualValue, expectedValue);
  }
);

Then(
  /^the password field should have attribute "(.*?)" with value "(.*?)"$/,
  async function (this: World, attribute: string, expectedValue: string) {
    const actualValue = await this.loginPage.getPasswordAttribute(attribute);
    assert.strictEqual(actualValue, expectedValue);
  }
);

Then(
  /^the password field should not have attribute "(.*?)" with value "(.*?)"$/,
  async function (this: World, attribute: string, unexpectedValue: string) {
    const actualValue = await this.loginPage.getPasswordAttribute(attribute);
    assert.notStrictEqual(actualValue, unexpectedValue);
  }
);

Then(
  /^the login button should have attribute "(.*?)" with value "(.*?)"$/,
  async function (this: World, attribute: string, expectedValue: string) {
    const actualValue = await this.loginPage.getLoginButtonAttribute(attribute);
    assert.strictEqual(actualValue, expectedValue);
  }
);

// Login actions
When(
  /^I enter "(.*?)" into the username field$/,
  async function (this: World, username: string) {
    await this.loginPage.enterUsername(username);
  }
);

When(
  /^I enter "(.*?)" into the password field$/,
  async function (this: World, password: string) {
    await this.loginPage.enterPassword(password);
  }
);

When(
  /^I click the login button$/,
  async function (this: World) {
    await this.loginPage.clickLoginButton();
  }
);

// Login result assertions
Then(
  /^the login should be successful$/,
  async function (this: World) {
    const flashMessage = await this.loginPage.getFlashMessageText();
    assert.match(flashMessage, /You logged into a secure area!/);
    const isLogoutPresent = await this.loginPage.isLogoutButtonPresent();
    assert.strictEqual(isLogoutPresent, true);
  }
);

Then(
  /^the login should fail$/,
  async function (this: World) {
    const flashMessage = await this.loginPage.getFlashMessageText();
    assert.match(flashMessage, /Your username is invalid!|Your password is invalid!/);
    const isLoginPresent = await this.loginPage.isLoginButtonPresent();
    assert.strictEqual(isLoginPresent, true);
  }
);
