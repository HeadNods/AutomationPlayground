import { DataTable, Given, Then } from "@cucumber/cucumber";
import { BrokenImagesPage } from "../pages/pageObjects/brokenImagesPage";
import { World } from "../support/driverController";
import assert from "assert";

// Navigation
Given(
  /^I navigate to the Broken Images page$/,
  async function (this: World) {
    this.brokenImagesPage = new BrokenImagesPage(this);
    await this.brokenImagesPage.navigate();
    const pageTitle = await this.brokenImagesPage.getTitleText();
    assert.strictEqual(pageTitle, "The Internet");
    const pageHeader = await this.brokenImagesPage.getHeaderText();
    assert.strictEqual(pageHeader, "Broken Images");
  }
);

// Assertions
Then(
  /^there should be "(.*?)" images on the page$/,
  async function (this: World, expectedNumber: string) {
    const actualNumber = await this.brokenImagesPage.getNumberOfImages();
    assert.strictEqual(actualNumber, parseInt(expectedNumber));
  }
);

Then(
  /^there should be "(.*?)" broken images on the page$/,
  async function (this: World, expectedNumber: string) {
    const imagesVisibility = await this.brokenImagesPage.getImagesVisibility();
    let actualNumber = 0;
    for (const isVisible of imagesVisibility) {
        if (!isVisible) {
            actualNumber++;
        }
    }
    assert.strictEqual(actualNumber, parseInt(expectedNumber));
  }
);

  Then(
  /^the images have the following sources$/,
  async function (this: World, dataTable: DataTable) {
    const imageSources = await this.brokenImagesPage.getImageSources();
    for (const columns of dataTable.rows()) {
        let imageNumber = columns[0];
        let expectedSrc = columns[1];
        const actualSrc = imageSources[parseInt(imageNumber) - 1];
        assert.strictEqual(actualSrc, expectedSrc);
    }
  }
);