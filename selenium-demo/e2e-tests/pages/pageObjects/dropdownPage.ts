import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class DropdownPage extends BasePage {

    // Locators
    private readonly header = By.css("h3");
    private readonly dropdown = By.id("dropdown");
    private readonly option1 = By.css("option[value='1']");
    private readonly option2 = By.css("option[value='2']");
    private readonly disabledOption = By.css("option[value='']");
    private readonly selectedOption = By.css("#dropdown option:checked");

    constructor(world: World) {
        super(world)
    }

    // Page URL
    readonly url = "https://the-internet.herokuapp.com/dropdown";

    // Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }
    async getPageTitle(): Promise<string> {
        return await this.getTitle();
    }
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }
    async getSelectedOptionText(): Promise<string> {
        return await this.getElementText(this.selectedOption);
    }
    async selectOption1(): Promise<void> {
        await this.selectOptionFromDropdown(this.dropdown, this.option1);
    }
    async selectOption2(): Promise<void> {
        await this.selectOptionFromDropdown(this.dropdown, this.option2);
    }
    async isOption1Selected(): Promise<boolean> {
        return await this.getElementAttribute(this.option1, "selected") === "true";
    }
    async isOption2Selected(): Promise<boolean> {
        return await this.getElementAttribute(this.option2, "selected") === "true";
    }
    async isDisabledOptionSelected(): Promise<boolean> {
        return await this.getElementAttribute(this.disabledOption, "selected") === "true";
    }
    async isDisabledOptionDisabled(): Promise<boolean> {
        return await this.getElementAttribute(this.disabledOption, "disabled") === "true";
    }
}