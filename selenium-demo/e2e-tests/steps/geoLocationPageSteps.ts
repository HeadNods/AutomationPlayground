import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { GeoLocationPage } from "../pages/pageObjects/geoLocationPage";
import { World } from "../support/driverController";

let geoLocationPage: GeoLocationPage;

Given('I navigate to the geolocation page', async function (this: World) {
    geoLocationPage = new GeoLocationPage(this);
    await geoLocationPage.navigate();
});

When('I click the {string} button', async function (buttonText: string) {
    await geoLocationPage.clickGetLocationButton();
});

Then('I should see the header {string}', async function (expectedHeader: string) {
    const actualHeader = await geoLocationPage.getHeaderText();
    assert.strictEqual(actualHeader, expectedHeader);
});

Then('I should see the button text {string}', async function (expectedText: string) {
    const actualText = await geoLocationPage.getGetLocationButtonText();
    assert.strictEqual(actualText, expectedText);
});

Then('I should see the demo text {string}', async function (expectedText: string) {
    const actualText = await geoLocationPage.getDemoText();
    assert.strictEqual(actualText.includes(expectedText), true);
});

Then('I should see the latitude {string}', async function (expectedLatitude: string) {
    const actualLatitude = await geoLocationPage.getLatitudeText();
    assert.strictEqual(actualLatitude, expectedLatitude);
});

Then('I should see the longitude {string}', async function (expectedLongitude: string) {
    const actualLongitude = await geoLocationPage.getLongitudeText();
    assert.strictEqual(actualLongitude, expectedLongitude);
});

Then('I should see the map link text {string}', async function (expectedText: string) {
    const actualText = await geoLocationPage.getMapLinkText();
    assert.strictEqual(actualText, expectedText);
});

Then('the map link should contain the coordinates {string}', async function (coordinates: string) {
    const mapLinkHref = await geoLocationPage.getMapLinkHref();
    assert.strictEqual(mapLinkHref.includes(coordinates), true);
});