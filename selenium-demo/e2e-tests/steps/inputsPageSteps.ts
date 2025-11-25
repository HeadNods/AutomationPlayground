import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { InputsPage } from "../pages/inputsPage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Inputs page$/,
  async function (this: World) {
    this.inputsPage = new InputsPage(this);
    await this.inputsPage.navigate();
  }
);

// Input field presence
Then(
  /^the number input field should be present$/,
  async function (this: World) {
    const isPresent = await this.inputsPage.isInputPresent();
    assert.strictEqual(isPresent, true);
  }
);

// Input actions
When(
  /^I enter "(.*?)" into the number input$/,
  async function (this: World, value: string) {
    await this.inputsPage.enterNumber(value);
  }
);

When(
  /^I clear the number input$/,
  async function (this: World) {
    await this.inputsPage.clearInput();
  }
);

// Input value assertions
Then(
  /^the input value should be "(.*?)"$/,
  async function (this: World, expectedValue: string) {
    const actualValue = await this.inputsPage.getInputValue();
    assert.strictEqual(actualValue, expectedValue);
  }
);
