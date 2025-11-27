import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { FileUploadPage } from "../pages/pageObjects/fileUploadPage";
import assert from "assert";

// Navigation
Given(
    /^I navigate to the File Upload page$/,
    async function (this: World) {
        this.fileUploadPage = new FileUploadPage(this);
        await this.fileUploadPage.navigate();
        const pageHeader = await this.fileUploadPage.getHeaderText();
        assert.strictEqual(pageHeader, "File Uploader");
    }
);

// Actions
When(
    /^I upload the file "(.*?)"$/,
    async function (this: World, filePath: string) {
        await this.fileUploadPage.uploadFile(filePath);
    }
);

When(
    /^I upload the file "(.*?)" via drag and drop$/,
    async function (this: World, filePath: string) {
        await this.fileUploadPage.uploadFileViaDragAndDrop(filePath);
    }
);

When(
    /^I click the upload submit button$/,
    async function (this: World) {
        await this.fileUploadPage.clickSubmitButton();
    }
);

// Assertions
Then(
    /^the uploaded file name should be "(.*?)"$/,
    async function (this: World, expectedFileName: string) {
        const actualFileName = await this.fileUploadPage.getUploadedFilesText();
        assert.strictEqual(actualFileName, expectedFileName);
    }
);

Then(
    /^the dropzone should display the file name "(.*?)"$/,
    async function (this: World, expectedFileName: string) {
        const actualFileName = await this.fileUploadPage.getDropzoneFileName();
        assert.strictEqual(actualFileName, expectedFileName);
    }
);
Then(
    /^the file upload header should have changed into "(.*?)"$/,
    async function (this: World, expectedChangedHeader: string) {
        const actualHeader = await this.fileUploadPage.getHeaderText();
        assert.strictEqual(actualHeader, expectedChangedHeader);
    }
);