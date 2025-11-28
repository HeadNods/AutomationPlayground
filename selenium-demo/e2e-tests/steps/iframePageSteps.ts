import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import assert from "assert";
import { IframePage } from "../pages/pageObjects/iframePage";

// Navigation
Given(
  /^I navigate to the iframe page$/,
  async function (this: World) {
    this.iframePage = new IframePage(this);
    await this.iframePage.navigate();
  }
);

// Actions
When(
  /^I click on the "(single|multiple)" iframe tab$/,
  async function (this: World, tab: 'single' | 'multiple') {
    await this.iframePage.clickIframeTab(tab);
  }
);
When(
  /^I switch to the "(single|multiple|multiple-inner)" iframe$/,
  async function (this: World, frame: 'single' | 'multiple' | 'multiple-inner') {
    await this.iframePage.switchToIframe(frame);
  }
);
When(
  /^I switch back to the main page content$/,
  async function (this: World) {
    await this.iframePage.switchToPageContent();
  }
);
When(
  /^I enter "(.*?)" into the iframe input$/,
  async function (this: World, text: string) {
    await this.iframePage.enterTextInFrameInput(text);
  }
);

// Assertions
Then(
    /^the active tab should be "(.*?)"$/,
    async function (this: World, expectedTab: string) {
      const actualTab = await this.iframePage.getActiveTabText();
      assert.strictEqual(actualTab, expectedTab);
    }
);
Then(
  /^the iframe header should contain "(.*?)"$/,
  async function (this: World, expectedTitle: string) {
    const actualTitle = await this.iframePage.getIframeHeaderText();
    assert.strictEqual(actualTitle, expectedTitle);
  }
);
Then(
  /^the iframe input should have value "(.*?)"$/,
  async function (this: World, expectedInput: string) {
    const actualInput = await this.iframePage.getIframeInputValue();
    assert.strictEqual(actualInput, expectedInput);
  }
);
Then(
  /^the iframe header should be "(present|not present)"$/,
  async function (this: World, presence: string) {
    const isPresent = await this.iframePage.getIframeHeaderPresence();
    if (presence === "present") {
      assert.strictEqual(isPresent, true);
    } else {
      assert.strictEqual(isPresent, false);
    }
  }
);
Then(
  /^the iframe input should be "(present|not present)"$/,
  async function (this: World, presence: string) {
    const isPresent = await this.iframePage.getIframeInputPresence();
    if (presence === "present") {
      assert.strictEqual(isPresent, true);
    } else {
      assert.strictEqual(isPresent, false);
    }
  }
);