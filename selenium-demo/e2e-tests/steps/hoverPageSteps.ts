import { Given, When, Then } from "@cucumber/cucumber";
import { HoverPage } from "../pages/pageObjects/hoverPage";
import { World } from "../support/driverController";
import assert from "assert";

// Navigation
Given(/^I navigate to the hover page$/, async function (this: World) {
    this.hoverPage = new HoverPage(this);
    await this.hoverPage.navigate();
});

// Actions
When(/^I hover over figure 1$/, async function (this: World) {
    await this.hoverPage.hoverOverFigure1();
});

When(/^I hover over figure 2$/, async function (this: World) {
    await this.hoverPage.hoverOverFigure2();
});

When(/^I hover over figure 3$/, async function (this: World) {
    await this.hoverPage.hoverOverFigure3();
});

// Assertions
Then(/^I should see the hover header "(.*)"$/, async function (this: World, expectedHeader: string) {
    const actualHeader = await this.hoverPage.getHeaderText();
    assert.strictEqual(actualHeader, expectedHeader);
});

Then(/^I should see the hover description "(.*)"$/, async function (this: World, expectedDescription: string) {
    const actualDescription = await this.hoverPage.getDescriptionText();
    assert.strictEqual(actualDescription, expectedDescription);
});

Then(/^figure 1 caption should not be displayed$/, async function (this: World) {
    const isDisplayed = await this.hoverPage.isFigure1CaptionDisplayed();
    assert.strictEqual(isDisplayed, false);
});

Then(/^figure 2 caption should not be displayed$/, async function (this: World) {
    const isDisplayed = await this.hoverPage.isFigure2CaptionDisplayed();
    assert.strictEqual(isDisplayed, false);
});

Then(/^figure 3 caption should not be displayed$/, async function (this: World) {
    const isDisplayed = await this.hoverPage.isFigure3CaptionDisplayed();
    assert.strictEqual(isDisplayed, false);
});

Then(/^figure 1 caption should be displayed$/, async function (this: World) {
    const isDisplayed = await this.hoverPage.isFigure1CaptionDisplayed();
    assert.strictEqual(isDisplayed, true);
});

Then(/^figure 2 caption should be displayed$/, async function (this: World) {
    const isDisplayed = await this.hoverPage.isFigure2CaptionDisplayed();
    assert.strictEqual(isDisplayed, true);
});

Then(/^figure 3 caption should be displayed$/, async function (this: World) {
    const isDisplayed = await this.hoverPage.isFigure3CaptionDisplayed();
    assert.strictEqual(isDisplayed, true);
});

Then(/^figure 1 caption title should be "(.*)"$/, async function (this: World, expectedTitle: string) {
    const actualTitle = await this.hoverPage.getFigure1CaptionTitle();
    assert.strictEqual(actualTitle, expectedTitle);
});

Then(/^figure 2 caption title should be "(.*)"$/, async function (this: World, expectedTitle: string) {
    const actualTitle = await this.hoverPage.getFigure2CaptionTitle();
    assert.strictEqual(actualTitle, expectedTitle);
});

Then(/^figure 3 caption title should be "(.*)"$/, async function (this: World, expectedTitle: string) {
    const actualTitle = await this.hoverPage.getFigure3CaptionTitle();
    assert.strictEqual(actualTitle, expectedTitle);
});

Then(/^figure 1 caption link text should be "(.*)"$/, async function (this: World, expectedText: string) {
    const actualText = await this.hoverPage.getFigure1CaptionLinkText();
    assert.strictEqual(actualText, expectedText);
});

Then(/^figure 2 caption link text should be "(.*)"$/, async function (this: World, expectedText: string) {
    const actualText = await this.hoverPage.getFigure2CaptionLinkText();
    assert.strictEqual(actualText, expectedText);
});

Then(/^figure 3 caption link text should be "(.*)"$/, async function (this: World, expectedText: string) {
    const actualText = await this.hoverPage.getFigure3CaptionLinkText();
    assert.strictEqual(actualText, expectedText);
});

Then(/^figure 1 caption link href should contain "(.*)"$/, async function (this: World, expectedHref: string) {
    const actualHref = await this.hoverPage.getFigure1CaptionLinkHref();
    assert.strictEqual(actualHref.includes(expectedHref), true);
});

Then(/^figure 2 caption link href should contain "(.*)"$/, async function (this: World, expectedHref: string) {
    const actualHref = await this.hoverPage.getFigure2CaptionLinkHref();
    assert.strictEqual(actualHref.includes(expectedHref), true);
});

Then(/^figure 3 caption link href should contain "(.*)"$/, async function (this: World, expectedHref: string) {
    const actualHref = await this.hoverPage.getFigure3CaptionLinkHref();
    assert.strictEqual(actualHref.includes(expectedHref), true);
});
