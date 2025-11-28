import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { World } from "../../support/driverController";

export class RedirectorPage extends BasePage {
    //Locators
    private readonly header = By.css("div.example h3");
    private readonly description = By.css("div.example p");
    private readonly redirectLink = By.id("redirect");

    //Constructor
    constructor(world: World) {
        super(world);
    }

    //Page URL
    readonly url = "https://the-internet.herokuapp.com/redirector";

    //Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }

    async clickRedirectLink(): Promise<{ url: string, statusCode: number } | null> {
        return await this.getClickRequestResponse(this.redirectLink, "status_codes");
    }

    //Getters
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }

    async getDescriptionText(): Promise<string> {
        return await this.getElementText(this.description);
    }

    async getRedirectLinkText(): Promise<string> {
        return await this.getElementText(this.redirectLink);
    }

    async getRedirectLinkHref(): Promise<string> {
        return await this.getElementAttribute(this.redirectLink, "href");
    }

    async isRedirectLinkDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.redirectLink);
    }
}
