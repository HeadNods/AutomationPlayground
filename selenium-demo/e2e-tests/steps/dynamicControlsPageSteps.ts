import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { DynamicControlsPage } from "../pages/pageObjects/dynamicControlsPage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Dynamic Controls page$/,
  async function (this: World) {
    this.dynamicControlsPage = new DynamicControlsPage(this);
    await this.dynamicControlsPage.navigate();
  }
);

// Button click actions
When(
  /^I click the Remove button$/,
  async function (this: World) {
    await this.dynamicControlsPage.clickRemoveButton();
  }
);

When(
  /^I click the Add button$/,
  async function (this: World) {
    await this.dynamicControlsPage.clickAddButton();
  }
);

// Wait for elements
Then(
  /^I wait for the Add button to appear$/,
  async function (this: World) {
    await this.dynamicControlsPage.waitForAddButtonToDisplay(10);
  }
);

Then(
  /^I wait for the Remove button to appear$/,
  async function (this: World) {
    await this.dynamicControlsPage.waitForRemoveButtonToDisplay(10);
  }
);

// Button presence assertions
Then(
  /^the Add button should be present$/,
  async function (this: World) {
    const isPresent = await this.dynamicControlsPage.isAddButtonPresent();
    assert.strictEqual(isPresent, true);
  }
);

Then(
  /^the Remove button should be present$/,
  async function (this: World) {
    const isPresent = await this.dynamicControlsPage.isRemoveButtonPresent();
    assert.strictEqual(isPresent, true);
  }
);

Then(
  /^the Remove button should not be present$/,
  async function (this: World) {
    const isPresent = await this.dynamicControlsPage.isRemoveButtonPresent();
    assert.strictEqual(isPresent, false);
  }
);
