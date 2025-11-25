import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { JavascriptAlertsComponent as JavascriptAlertsComponent } from "../pages/components/javascriptAlertsComponent";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the JavaScript Alerts page$/,
  async function (this: World) {
    this.javascriptAlertsComponent = new JavascriptAlertsComponent(this);
    await this.javascriptAlertsComponent.navigate();
  }
);

// Click alert button actions
When(
  /^I click the JS Alert button$/,
  async function (this: World) {
    await this.javascriptAlertsComponent.clickJSAlertButton();
  }
);

When(
  /^I click the JS Confirm button$/,
  async function (this: World) {
    await this.javascriptAlertsComponent.clickJSConfirmButton();
  }
);

When(
  /^I click the JS Prompt button$/,
  async function (this: World) {
    await this.javascriptAlertsComponent.clickJSPromptButton();
  }
);

// Alert text assertion (shared with contextMenuPageSteps)
Then(
  /^the alert text should be "(.*?)"$/,
  async function (this: World, expectedText: string) {
    const actualText = await this.javascriptAlertsComponent.getAlertText();
    assert.strictEqual(actualText, expectedText);
  }
);

// Alert actions (shared with contextMenuPageSteps)
Then(
  /^I accept the alert$/,
  async function (this: World) {
    await this.javascriptAlertsComponent.acceptAlert();
  }
);

Then(
  /^I dismiss the alert$/,
  async function (this: World) {
    await this.javascriptAlertsComponent.dismissAlert();
  }
);
