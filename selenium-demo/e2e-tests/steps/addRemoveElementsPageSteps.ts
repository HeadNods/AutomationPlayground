import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { AddRemoveElementsPage } from "../pages/addRemoveElementsPage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Add\/Remove Elements page$/,
  async function (this: World) {
    this.addRemoveElementsPage = new AddRemoveElementsPage(this);
    await this.addRemoveElementsPage.navigate();
  }
);

// Button text assertions
Then(
  /^the Add Element button should have text "(.*?)"$/,
  async function (this: World, expectedText: string) {
    const actualText = await this.addRemoveElementsPage.getAddElementButtonText();
    assert.strictEqual(actualText, expectedText);
  }
);

Then(
  /^the Add Element button should not have text "(.*?)"$/,
  async function (this: World, unexpectedText: string) {
    const actualText = await this.addRemoveElementsPage.getAddElementButtonText();
    assert.notStrictEqual(actualText, unexpectedText);
  }
);

Then(
  /^the Add Element button should contain text "(.*?)"$/,
  async function (this: World, partialText: string) {
    const actualText = await this.addRemoveElementsPage.getAddElementButtonText();
    assert.match(actualText, new RegExp(partialText));
  }
);

// Click actions
When(
  /^I click the Add Element button$/,
  async function (this: World) {
    await this.addRemoveElementsPage.clickAddElement();
  }
);

// Delete button assertions
Then(
  /^the Delete button should be present$/,
  async function (this: World) {
    const isPresent = await this.addRemoveElementsPage.isDeleteButtonPresent();
    assert.strictEqual(isPresent, true);
  }
);
