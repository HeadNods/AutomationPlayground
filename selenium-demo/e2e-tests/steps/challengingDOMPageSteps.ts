import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { ChallengingDOMPage } from "../pages/pageObjects/challengingDOMPage";
import { World } from "../support/driverController";
import assert from "assert";

let buttonTestButtonIdBefore = "";
let buttonTestAnswerValueBefore = "";

// Navigation
Given(
  /^I navigate to the Challenging DOM page$/,
  async function (this: World) {
    this.challengingDOMPage = new ChallengingDOMPage(this);
    await this.challengingDOMPage.navigate();
    const pageTitle = await this.challengingDOMPage.getTitleText();
    assert.strictEqual(pageTitle, "The Internet");
    const pageHeader = await this.challengingDOMPage.getHeaderText();
    assert.strictEqual(pageHeader, "Challenging DOM");
  }
);

// Assertions
Then(
  /^the header for the specified column should contain the specified text$/,
  async function (this: World, table: DataTable) {
    const actualHeaders = await this.challengingDOMPage.getTableHeadersText();
    for (const columns of table.rows()) {
        let columnNumber = columns[0];
        let expectedText = columns[1];
        const actualText = actualHeaders[parseInt(columnNumber) - 1];
        assert.strictEqual(actualText.includes(expectedText), true, `Expected text "${expectedText}" not found in header "${actualText}"`);
    }
  }
);
Then(
  /^all rows for the specified column should start with the specified text$/,
  async function (this: World, table: DataTable) {
    for (const columns of table.rows()) {
        let columnNumber = columns[0];
        let expectedText = columns[1];
        let actualTexts: string[] = [];
        switch (columnNumber) {
            case "1":
                actualTexts = await this.challengingDOMPage.getColumnOneCellsText();;
                break;
            case "2":
                actualTexts = await this.challengingDOMPage.getColumnTwoCellsText();;
                break;
            case "3":
                actualTexts = await this.challengingDOMPage.getColumnThreeCellsText();;
                break;  
            case "4":
                actualTexts = await this.challengingDOMPage.getColumnFourCellsText();;
                break;
            case "5":
                actualTexts = await this.challengingDOMPage.getColumnFiveCellsText();;
                break;
            case "6":
                actualTexts = await this.challengingDOMPage.getColumnSixCellsText();;
                break;
            case "7":
                actualTexts = await this.challengingDOMPage.getColumnSevenCellsText();;
                break;
            default:
                throw new Error(`Unsupported column number: ${columnNumber}`);
        }
        for (const actualText of actualTexts) {
            assert.strictEqual(actualText.startsWith(expectedText), true, `Expected text "${expectedText}" not found at the start of "${actualText}"`);
        }
    }
  }
);
Then(
    /^all "(.*)" buttons should have the href "(.*)"$/,
    async function (this: World, buttonText: string, expectedHref: string) {
        let actualTexts: string[];
        let actualHrefs: string[];
        
        switch (buttonText) {
            case "edit":
                actualTexts = await this.challengingDOMPage.getEditButtonsText();
                actualHrefs = await this.challengingDOMPage.getEditButtonsHref();
                break;
            case "delete":
                actualTexts = await this.challengingDOMPage.getDeleteButtonsText();
                actualHrefs = await this.challengingDOMPage.getDeleteButtonsHref();
                break;
            default:
                throw new Error(`Unsupported button text: ${buttonText}`);
        }

        for (const text of actualTexts) {
            assert.strictEqual(text, buttonText, `Expected button text "${buttonText}" but found "${text}"`);
        }

        for (const actualHref of actualHrefs) {
            assert.strictEqual(actualHref, this.challengingDOMPage.url + expectedHref, `Expected href "${expectedHref}" but found "${actualHref}"`);
        }
    }
)
Then(
  /^there should be "(.*?)" main buttons on the page$/,
  async function (this: World, expectedNumber: string) {
    const actualNumber = await this.challengingDOMPage.getNumberOfButtons();
    assert.strictEqual(actualNumber, parseInt(expectedNumber));
  }
);

When(
    /^I click the "(.*?)" button on the Challenging DOM page$/,
    async function (this: World, buttonPosition: string) {
        buttonTestAnswerValueBefore = await this.challengingDOMPage.getAnswerValueFromScript();
        switch (buttonPosition) {
            case "first":
                buttonTestButtonIdBefore = await this.challengingDOMPage.getFirstButtonId();
                await this.challengingDOMPage.clickFirstButton();
                break;
            case "second":
                buttonTestButtonIdBefore = await this.challengingDOMPage.getSecondButtonId();
                await this.challengingDOMPage.clickSecondButton();
                break;
            case "third":
                buttonTestButtonIdBefore = await this.challengingDOMPage.getThirdButtonId();
                await this.challengingDOMPage.clickThirdButton();
                break;
            default:
                throw new Error(`Unsupported button position: ${buttonPosition}`);
        }
    }
);
Then(
    /^the answer value should be updated$/,
    async function (this: World) {
        const answerValue = await this.challengingDOMPage.getAnswerValueFromScript();
        assert.notStrictEqual(answerValue, buttonTestAnswerValueBefore, `Expected answer value to be updated from "${buttonTestAnswerValueBefore}" but it remained the same.`);
    }
)
Then(
    /^the "(.*)" button its Id should be updated$/,
    async function (this: World, buttonNumber: string) {
        let buttonId = "";
        switch (buttonNumber) {
            case "first":
                buttonId = await this.challengingDOMPage.getFirstButtonId();
                break;
            case "second":
                buttonId = await this.challengingDOMPage.getSecondButtonId();
                break;
            case "third":
                buttonId = await this.challengingDOMPage.getThirdButtonId();
                break;
            default:
                throw new Error(`Unsupported button number: ${buttonNumber}`);
        }
        assert.notStrictEqual(buttonId, buttonTestButtonIdBefore, `Expected button Id to be updated from "${buttonTestButtonIdBefore}" but it remained the same.`);
    }
);