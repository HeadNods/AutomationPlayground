import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { World } from "../../support/driverController";

export class HoverPage extends BasePage {
    //Locators
    private readonly header = By.css("div.example h3");
    private readonly description = By.css("div.example p");
    private readonly figure1 = By.css("div.figure:nth-of-type(1)");
    private readonly figure2 = By.css("div.figure:nth-of-type(2)");
    private readonly figure3 = By.css("div.figure:nth-of-type(3)");
    private readonly figure1Image = By.css("div.figure:nth-of-type(1) img");
    private readonly figure2Image = By.css("div.figure:nth-of-type(2) img");
    private readonly figure3Image = By.css("div.figure:nth-of-type(3) img");
    private readonly figure1Caption = By.css("div.figure:nth-of-type(1) .figcaption");
    private readonly figure2Caption = By.css("div.figure:nth-of-type(2) .figcaption");
    private readonly figure3Caption = By.css("div.figure:nth-of-type(3) .figcaption");
    private readonly figure1CaptionTitle = By.css("div.figure:nth-of-type(1) .figcaption h5");
    private readonly figure2CaptionTitle = By.css("div.figure:nth-of-type(2) .figcaption h5");
    private readonly figure3CaptionTitle = By.css("div.figure:nth-of-type(3) .figcaption h5");
    private readonly figure1CaptionLink = By.css("div.figure:nth-of-type(1) .figcaption a");
    private readonly figure2CaptionLink = By.css("div.figure:nth-of-type(2) .figcaption a");
    private readonly figure3CaptionLink = By.css("div.figure:nth-of-type(3) .figcaption a");
    //Constructor
    constructor(world: World) {
        super(world);
    }
    //Page URL
    readonly url = "https://the-internet.herokuapp.com/hovers"
    //Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }
    async hoverOverFigure1(): Promise<void> {
        await this.hoverOverElement(this.figure1Image);
    }
    async hoverOverFigure2(): Promise<void> {
        await this.hoverOverElement(this.figure2Image);
    }
    async hoverOverFigure3(): Promise<void> {
        await this.hoverOverElement(this.figure3Image);
    }
    //Getters
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }
    async getDescriptionText(): Promise<string> {
        return await this.getElementText(this.description);
    }
    async isFigure1CaptionDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.figure1Caption);
    }
    async isFigure2CaptionDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.figure2Caption);
    }
    async isFigure3CaptionDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.figure3Caption);
    }
    async getFigure1CaptionTitle(): Promise<string> {
        return await this.getElementText(this.figure1CaptionTitle);
    }
    async getFigure2CaptionTitle(): Promise<string> {
        return await this.getElementText(this.figure2CaptionTitle);
    }
    async getFigure3CaptionTitle(): Promise<string> {
        return await this.getElementText(this.figure3CaptionTitle);
    }
    async getFigure1CaptionLinkText(): Promise<string> {
        return await this.getElementText(this.figure1CaptionLink);
    }
    async getFigure2CaptionLinkText(): Promise<string> {
        return await this.getElementText(this.figure2CaptionLink);
    }
    async getFigure3CaptionLinkText(): Promise<string> {
        return await this.getElementText(this.figure3CaptionLink);
    }
    async getFigure1CaptionLinkHref(): Promise<string> {
        return await this.getElementAttribute(this.figure1CaptionLink, "href");
    }
    async getFigure2CaptionLinkHref(): Promise<string> {
        return await this.getElementAttribute(this.figure2CaptionLink, "href");
    }
    async getFigure3CaptionLinkHref(): Promise<string> {
        return await this.getElementAttribute(this.figure3CaptionLink, "href");
    }
}
