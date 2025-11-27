import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { DynamicLoadingPage } from "../pages/pageObjects/dynamicLoadingPage";
import assert from "assert";

// Navigation
Given(
    /^I navigate to the Dynamic Loading page$/,
    async function (this: World) {
        this.dynamicLoadingPage = new DynamicLoadingPage(this);
        await this.dynamicLoadingPage.navigate();
    }
);

// Actions
When(
    /^I navigate to Example (1|2)$/,
    async function (this: World, exampleNumber: string) {
        if (exampleNumber === "1") {
            await this.dynamicLoadingPage.clickExample1Link();
        } else if (exampleNumber === "2") {
            await this.dynamicLoadingPage.clickExample2Link();
        } else {
            throw new Error(`Invalid example number: ${exampleNumber}`);
        }
    }
);

When(
    /^I click the "Start" button$/,
    async function (this: World) {
        await this.dynamicLoadingPage.clickStartButton();
    }
);

When(
    /^I wait for the loading to complete$/,
    async function (this: World) {
        await this.dynamicLoadingPage.waitForLoadingToDisappear();
    }
);

// Assertions
Then(
    /^the "Start" button is (not )?displayed$/,
    async function (this: World, notModifier: string) {
        const isDisplayed = await this.dynamicLoadingPage.isStartButtonDisplayed();
        const expected = !notModifier;
        assert.strictEqual(isDisplayed, expected, `Expected Start button to ${notModifier ? 'not ' : ''}be displayed`);
    }
);

Then(
    /^the "Start" button is in the DOM$/,
    async function (this: World) {
        const isInDOM = await this.dynamicLoadingPage.isStartButtonInDOM();
        assert.strictEqual(isInDOM, true, 'Expected Start button to be in the DOM');
    }
);

Then(
    /^the loading indicator is (not )?displayed$/,
    async function (this: World, notModifier: string) {
        const isDisplayed = await this.dynamicLoadingPage.isLoadingIndicatorDisplayed();
        const expected = !notModifier;
        assert.strictEqual(isDisplayed, expected, `Expected loading indicator to ${notModifier ? 'not ' : ''}be displayed`);
    }
);

Then(
    /^the loading indicator is (not )?in the DOM$/,
    async function (this: World, notModifier: string) {
        const isInDOM = await this.dynamicLoadingPage.isLoadingIndicatorInDOM();
        const expected = !notModifier;
        assert.strictEqual(isInDOM, expected, `Expected loading indicator to ${notModifier ? 'not ' : ''}be in the DOM`);
    }
);

Then(
    /^the "Hello World!" finish text is (not )?displayed$/,
    async function (this: World, notModifier: string) {
        const isDisplayed = await this.dynamicLoadingPage.isFinishTextDisplayed();
        const expected = !notModifier;
        assert.strictEqual(isDisplayed, expected, `Expected finish text to ${notModifier ? 'not ' : ''}be displayed`);
    }
);

Then(
    /^the "Hello World!" finish text is (not )?in the DOM$/,
    async function (this: World, notModifier: string) {
        const isInDOM = await this.dynamicLoadingPage.isFinishTextInDOM();
        const expected = !notModifier;
        assert.strictEqual(isInDOM, expected, `Expected finish text to ${notModifier ? 'not ' : ''}be in the DOM`);
    }
);