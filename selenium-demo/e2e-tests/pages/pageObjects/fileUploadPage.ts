import { By } from "selenium-webdriver";
import * as remote from "selenium-webdriver/remote";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";
import * as path from "path";

export class FileUploadPage extends BasePage {

    // Locators
    private readonly header = By.css("h3");
    private readonly fileUploadInput = By.id("file-upload");
    private readonly fileSubmitBtn = By.id("file-submit");
    private readonly uploadedFilesText = By.id("uploaded-files");
    private readonly fileDropzoneHiddenInput = By.className("dz-hidden-input");
    private readonly dropzoneFileName = By.className("dz-filename");

    constructor(world: World) {
        super(world);
        // Enable file detector for remote uploads once during initialization
        this.driver.setFileDetector(new remote.FileDetector());
    }

    // Page URL
    readonly url = "https://the-internet.herokuapp.com/upload";

    // Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }
    async uploadFile(filePath: string): Promise<void> {
        const absolutePath = path.resolve(filePath);
        await this.enterText(this.fileUploadInput, absolutePath);
    }
    async clickSubmitButton(): Promise<void> {
        await this.click(this.fileSubmitBtn);
    }
    async getUploadedFilesText(): Promise<string> {
        return await this.getElementText(this.uploadedFilesText);
    }
    async getDropzoneFileName(): Promise<string> {
        return await this.getElementText(this.dropzoneFileName);
    }
    async uploadFileViaDragAndDrop(filePath: string): Promise<void> {
        const absolutePath = path.resolve(filePath);
        await this.enterText(this.fileDropzoneHiddenInput, absolutePath);
    }
}