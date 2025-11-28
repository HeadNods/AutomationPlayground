import { Given, When, Then } from "@cucumber/cucumber";
import { HorizontalSliderPage } from "../pages/pageObjects/horizontalSliderPage";
import { World } from "../support/driverController";
import assert from "assert";

// Navigation
Given(/^I navigate to the horizontal slider page$/, async function (this: World) {
    this.horizontalSliderPage = new HorizontalSliderPage(this);
    await this.horizontalSliderPage.navigate();
});

// Actions
When(/^I set the slider to "(.*)"$/, async function (this: World, value: string) {
    await this.horizontalSliderPage.setSliderValue(value);
});

// Assertions
Then(/^I should see the horizontal slider header "(.*)"$/, async function (this: World, expectedHeader: string) {
    const actualHeader = await this.horizontalSliderPage.getHeaderText();
    assert.strictEqual(actualHeader, expectedHeader);
});

Then(/^I should see the horizontal slider subheader$/, async function (this: World) {
    const subheaderText = await this.horizontalSliderPage.getSubheaderText();
    assert.strictEqual(subheaderText.includes("Set the focus on the slider"), true);
});

Then(/^the slider min value should be "(.*)"$/, async function (this: World, expectedMin: string) {
    const actualMin = await this.horizontalSliderPage.getSliderMinValue();
    assert.strictEqual(actualMin, expectedMin);
});

Then(/^the slider max value should be "(.*)"$/, async function (this: World, expectedMax: string) {
    const actualMax = await this.horizontalSliderPage.getSliderMaxValue();
    assert.strictEqual(actualMax, expectedMax);
});

Then(/^the slider step value should be "(.*)"$/, async function (this: World, expectedStep: string) {
    const actualStep = await this.horizontalSliderPage.getSliderStepValue();
    assert.strictEqual(actualStep, expectedStep);
});

Then(/^the range value should be "(.*)"$/, async function (this: World, expectedValue: string) {
    const actualValue = await this.horizontalSliderPage.getRangeValue();
    assert.strictEqual(actualValue, expectedValue);
});

Then(/^the slider current value should be "(.*)"$/, async function (this: World, expectedValue: string) {
    const actualValue = await this.horizontalSliderPage.getSliderCurrentValue();
    assert.strictEqual(actualValue, expectedValue);
});
