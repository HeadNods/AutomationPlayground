import { By, WebDriver, WebElement } from "selenium-webdriver";
import { World } from "../support/driverController";

export class InputsPage {
  private driver: WebDriver;

  // Locators
  private readonly numberInput = By.xpath("//input[@type='number']");
  private readonly exampleDiv = By.xpath("//div[@class='example']");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/inputs";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async enterNumber(value: string): Promise<void> {
    const element = await this.driver.findElement(this.numberInput);
    await element.clear();
    await element.sendKeys(value);
  }

  async clearInput(): Promise<void> {
    const element = await this.driver.findElement(this.numberInput);
    await element.clear();
  }

  async appendNumber(value: string): Promise<void> {
    const element = await this.driver.findElement(this.numberInput);
    await element.sendKeys(value);
  }

  // Assertions
  async getInputValue(): Promise<string> {
    const element = await this.driver.findElement(this.numberInput);
    return await element.getAttribute("value");
  }

  async isInputPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.numberInput);
    return elements.length > 0;
  }

  async getInputElement(): Promise<WebElement> {
    return await this.driver.findElement(this.numberInput);
  }

  async isExampleDivPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.exampleDiv);
    return elements.length > 0;
  }
}
