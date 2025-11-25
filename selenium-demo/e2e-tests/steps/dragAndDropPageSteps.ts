import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { DragAndDropPage } from "../pages/dragAndDropPage";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Drag and Drop page$/,
  async function (this: World) {
    this.dragAndDropPage = new DragAndDropPage(this);
    await this.dragAndDropPage.navigate();
  }
);

// Column text assertions
Then(
  /^column A should have text "(.*?)"$/,
  async function (this: World, expectedText: string) {
    const actualText = await this.dragAndDropPage.getColumnAText();
    assert.strictEqual(actualText, expectedText);
  }
);

Then(
  /^column B should have text "(.*?)"$/,
  async function (this: World, expectedText: string) {
    const actualText = await this.dragAndDropPage.getColumnBText();
    assert.strictEqual(actualText, expectedText);
  }
);

// Drag and drop actions
When(
  /^I drag column A to column B$/,
  async function (this: World) {
    await this.dragAndDropPage.dragColumnAToColumnB();
  }
);

When(
  /^I drag column B to column A$/,
  async function (this: World) {
    await this.dragAndDropPage.dragColumnBToColumnA();
  }
);
