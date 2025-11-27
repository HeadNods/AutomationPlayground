import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class DynamicLoadingPage extends BasePage {

    // Locators
    private readonly startButton = By.xpath("//button[text()='Start']");
    private readonly finishText = By.id("finish");
    private readonly loadingIndicator = By.id("loading");
    private readonly example1Href = By.xpath("//a[contains(@href, '/dynamic_loading/1')]");
    private readonly example2Href = By.xpath("//a[contains(@href, '/dynamic_loading/2')]");

    constructor(world: World) {
        super(world)
    }

    // Page URL
    readonly url = "https://the-internet.herokuapp.com/dynamic_loading";

    // Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }
    async clickExample1Link(): Promise<void> {
        await this.click(this.example1Href);
    }
    async clickExample2Link(): Promise<void> {
        await this.click(this.example2Href);
    }
    async clickStartButton(): Promise<void> {
        await this.click(this.startButton);
    }
    async waitForLoadingToDisappear(timeoutSec: number = 12): Promise<void> {
        await this.waitForElementToDisplay(this.finishText, timeoutSec);
    }
    async getFinishText(): Promise<string> {
        return await this.getElementText(this.finishText);
    }
    // Assertions
    async isLoadingIndicatorDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.loadingIndicator);
    }
    async isFinishTextDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.finishText);
    }
    async isStartButtonDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.startButton);
    }

    async isFinishTextInDOM(): Promise<boolean> {
        return await this.isElementInDOM(this.finishText);
    }
    async isLoadingIndicatorInDOM(): Promise<boolean> {
        return await this.isElementInDOM(this.loadingIndicator);
    }
    async isStartButtonInDOM(): Promise<boolean> {
        return await this.isElementInDOM(this.startButton);
    }
}