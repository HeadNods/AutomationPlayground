import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class IframePage extends BasePage {
    constructor(world: World) {
        super(world);
    }
    // Locators
    private readonly activeTabIndicator = By.css(".nav-tabs .active a");
    private readonly iframeTabSingle = By.xpath("//a[@href='#Single']");
    private readonly iframeTabMultiple = By.xpath("//a[@href='#Multiple']");
    private readonly iframeSingleFrame = By.id("singleframe");
    private readonly iframeMultipleFrames = By.xpath("//iframe[@src='MultipleFrames.html']");
    private readonly iframeMultipleInnerFrame = By.xpath("//iframe[@src='SingleFrame.html']");
    private readonly singleOrMultiOrInnerFrameHeader = By.xpath("//h5");
    private readonly singleOrInnerFrameInput = By.xpath("//input[@type='text']");
    // Page URL
    readonly url = "https://demo.automationtesting.in/Frames.html";
    // Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
        // Execute script to remove consent dialog if it exists and whitespace (only shown on automated runs) that may hide iframe content
        await this.driver.executeScript(`
        const dialogs = document.querySelectorAll('[class*="consent"], [id*="consent"], [class*="cookie"]');
        dialogs.forEach(d => d.remove());

        // Remove the header which may overlap with iframe content
        document.querySelectorAll('#header').forEach(header => {
            header.remove();
        });
        `);

        await this.driver.executeScript('document.body.style.display="block";');
    }
    async clickIframeTab(tab: ('single' | 'multiple')): Promise<void> {
        switch (tab) {
            case "single":
                await this.clickForcefully(this.iframeTabSingle);
                break;
            case "multiple":
                await this.clickForcefully(this.iframeTabMultiple);
                break;
            default:
                throw new Error(`Tab ${tab} not recognized`);
        }
    }
    async switchToIframe(frame: ('single' | 'multiple' | 'multiple-inner')): Promise<void> {
        switch (frame) {
            case "single":
                await this.switchToFrame(this.iframeSingleFrame);
                break;
            case "multiple":
                await this.switchToFrame(this.iframeMultipleFrames);
                break;
            case "multiple-inner":
                await this.switchToFrame(this.iframeMultipleInnerFrame);
                break;
            default:
                throw new Error(`Frame ${frame} not recognized`);
        }
    }
    async switchToPageContent(): Promise<void> {
        await this.switchToDefaultContent();
    }
    async enterTextInFrameInput(text: string): Promise<void> {
        await this.enterText(this.singleOrInnerFrameInput, text);
    }
    // Getters
    async getIframeHeaderText(): Promise<string> {
        return await this.getElementText(this.singleOrMultiOrInnerFrameHeader);
    }
    async getIframeInputValue(): Promise<string> {
        return await this.getElementAttribute(this.singleOrInnerFrameInput, 'value');
    }
    async getActiveTabText(): Promise<string> {
        return await this.getElementText(this.activeTabIndicator);
    }
    async getIframeHeaderPresence(): Promise<boolean> {
        return await this.isElementInDOM(this.singleOrMultiOrInnerFrameHeader);
    }
    async getIframeInputPresence(): Promise<boolean> {
        return await this.isElementInDOM(this.singleOrInnerFrameInput);
    }
}