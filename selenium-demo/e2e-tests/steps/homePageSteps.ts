import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { HomePage } from "../pages/pageObjects/homePage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the home page$/,
  async function (this: World) {
    this.homePage = new HomePage(this);
    await this.homePage.navigate();
  }
);

// Page title assertions
Then(
  /^the page title should be "(.*?)"$/,
  async function (this: World, expectedTitle: string) {
    const actualTitle = await this.homePage.getPageTitle();
    assert.strictEqual(actualTitle, expectedTitle);
  }
);

Then(
  /^the page title should not be "(.*?)"$/,
  async function (this: World, unexpectedTitle: string) {
    const actualTitle = await this.homePage.getPageTitle();
    assert.notStrictEqual(actualTitle, unexpectedTitle);
  }
);

Then(
  /^the page title should contain "(.*?)"$/,
  async function (this: World, partialTitle: string) {
    const actualTitle = await this.homePage.getPageTitle();
    assert.match(actualTitle, new RegExp(partialTitle));
  }
);

Then(
  /^the page title should not contain "(.*?)"$/,
  async function (this: World, partialTitle: string) {
    const actualTitle = await this.homePage.getPageTitle();
    assert.doesNotMatch(actualTitle, new RegExp(partialTitle));
  }
);

// Click on link
When(
  /^I click on the "(.*?)" link$/,
  async function (this: World, linkText: string) {
    await this.homePage.clickLink(linkText);
  }
);

// Browser navigation actions
When(
  /^I navigate back$/,
  async function (this: World) {
    await this.homePage.navigateBack();
  }
);

When(
  /^I navigate forward$/,
  async function (this: World) {
    await this.homePage.navigateForward();
  }
);

When(
  /^I refresh the page$/,
  async function (this: World) {
    await this.homePage.refresh();
  }
);

When(
  /^I close the browser$/,
  async function (this: World) {
    await this.homePage.closeBrowser();
  }
);
