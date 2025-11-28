import { Given, When, Then } from "@cucumber/cucumber";
import { RedirectorPage } from "../pages/pageObjects/redirectorPage";
import { World } from "../support/driverController";
import assert from "assert";

// Navigation
Given(/^I navigate to the redirector page$/, async function (this: World) {
    this.redirectorPage = new RedirectorPage(this);
    await this.redirectorPage.navigate();
});

// Actions
When(/^I click the redirect link$/, async function (this: World) {
    this.networkResponse = await this.redirectorPage.clickRedirectLink();
});

// Assertions
Then(/^I should see the redirector header "(.*)"$/, async function (this: World, expectedHeader: string) {
    const actualHeader = await this.redirectorPage.getHeaderText();
    assert.strictEqual(actualHeader, expectedHeader);
});

Then(/^I should see the redirector description containing "(.*)"$/, async function (this: World, expectedText: string) {
    const actualDescription = await this.redirectorPage.getDescriptionText();
    assert.strictEqual(actualDescription.includes(expectedText), true);
});

Then(/^the redirect link should be displayed$/, async function (this: World) {
    const isDisplayed = await this.redirectorPage.isRedirectLinkDisplayed();
    assert.strictEqual(isDisplayed, true);
});

Then(/^the redirect link text should be "(.*)"$/, async function (this: World, expectedText: string) {
    const actualText = await this.redirectorPage.getRedirectLinkText();
    assert.strictEqual(actualText, expectedText);
});

Then(/^the redirect link href should contain "(.*)"$/, async function (this: World, expectedHref: string) {
    const actualHref = await this.redirectorPage.getRedirectLinkHref();
    assert.strictEqual(actualHref.includes(expectedHref), true);
});

Then(/^the response URL should contain "(.*)"$/, async function (this: World, expectedUrlPart: string) {
    assert.notStrictEqual(this.networkResponse, null, "Network response should not be null");
    assert.strictEqual(this.networkResponse!.url.includes(expectedUrlPart), true);
});

Then(/^the response status code should be "(.*)"$/, async function (this: World, expectedStatusCode: string) {
    assert.notStrictEqual(this.networkResponse, null, "Network response should not be null");
    assert.strictEqual(this.networkResponse!.statusCode.toString(), expectedStatusCode);
});
