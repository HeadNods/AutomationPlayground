import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { CheckboxesPage } from "../pages/pageObjects/checkboxesPage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Checkboxes page$/,
  async function (this: World) {
    this.checkboxesPage = new CheckboxesPage(this);
    await this.checkboxesPage.navigate();
  }
);

// Checkbox state assertions
Then(
  /^the first checkbox should be (checked|unchecked)$/,
  async function (this: World, state: string) {
    const isChecked = await this.checkboxesPage.isFirstCheckboxChecked();
    if (state === "checked") {
      assert.strictEqual(isChecked, true);
    } else {
      assert.strictEqual(isChecked, false);
    }
  }
);

Then(
  /^the second checkbox should be (checked|unchecked)$/,
  async function (this: World, state: string) {
    const isChecked = await this.checkboxesPage.isSecondCheckboxChecked();
    if (state === "checked") {
      assert.strictEqual(isChecked, true);
    } else {
      assert.strictEqual(isChecked, false);
    }
  }
);

// Click checkbox actions
When(
  /^I click the first checkbox$/,
  async function (this: World) {
    await this.checkboxesPage.clickFirstCheckbox();
  }
);

When(
  /^I click the second checkbox$/,
  async function (this: World) {
    await this.checkboxesPage.clickSecondCheckbox();
  }
);

// Checkbox form presence
Then(
  /^the checkbox form should be present$/,
  async function (this: World) {
    const isPresent = await this.checkboxesPage.isCheckboxFormPresent();
    assert.strictEqual(isPresent, true);
  }
);
