import { By  } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class InputsPage extends BasePage {
  // Locators
  private readonly numberInput = By.xpath("//input[@type='number']");
  private readonly exampleDiv = By.xpath("//div[@class='example']");

  constructor(world: World) {
    super(world);
  }

  // Page URL
  readonly url = "https://the-internet.herokuapp.com/inputs";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async enterNumber(value: string): Promise<void> {
    await this.clearText(this.numberInput);
    await this.enterText(this.numberInput, value);
  }

  async clearInput(): Promise<void> {
    await this.clearText(this.numberInput);
  }

  async appendNumber(value: string): Promise<void> {
    await this.enterText(this.numberInput, value);
  }

  // Assertions
  async getInputValue(): Promise<string> {
    return await this.getElementAttribute(this.numberInput, "value");
  }

  async isInputPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.numberInput);
  }

  async isExampleDivPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.exampleDiv);
  }
}
