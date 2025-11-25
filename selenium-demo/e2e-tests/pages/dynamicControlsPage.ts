import { By, WebDriver, until } from "selenium-webdriver";
import { World } from "../support/driverController";

export class DynamicControlsPage {
  private driver: WebDriver;

  // Locators
  private readonly removeButton = By.xpath("//button[text()='Remove']");
  private readonly addButton = By.xpath("//button[text()='Add']");
  private readonly enableButton = By.xpath("//button[text()='Enable']");
  private readonly disableButton = By.xpath("//button[text()='Disable']");
  private readonly checkbox = By.xpath("//input[@type='checkbox']");
  private readonly inputField = By.xpath("//input[@type='text']");
  private readonly message = By.id("message");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/dynamic_controls";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickRemoveButton(): Promise<void> {
    const element = await this.driver.findElement(this.removeButton);
    await element.click();
  }

  async clickAddButton(): Promise<void> {
    const element = await this.driver.findElement(this.addButton);
    await element.click();
  }

  async clickEnableButton(): Promise<void> {
    const element = await this.driver.findElement(this.enableButton);
    await element.click();
  }

  async clickDisableButton(): Promise<void> {
    const element = await this.driver.findElement(this.disableButton);
    await element.click();
  }

  async waitForAddButtonToDisplay(timeoutInSeconds: number = 10): Promise<void> {
    await this.driver.wait(
      until.elementLocated(this.addButton),
      timeoutInSeconds * 1000
    );
    await this.driver.wait(
      until.elementIsVisible(await this.driver.findElement(this.addButton)),
      timeoutInSeconds * 1000
    );
  }

  async waitForRemoveButtonToDisplay(timeoutInSeconds: number = 10): Promise<void> {
    await this.driver.wait(
      until.elementLocated(this.removeButton),
      timeoutInSeconds * 1000
    );
    await this.driver.wait(
      until.elementIsVisible(await this.driver.findElement(this.removeButton)),
      timeoutInSeconds * 1000
    );
  }

  // Assertions
  async isRemoveButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.removeButton);
    return elements.length > 0;
  }

  async isAddButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.addButton);
    return elements.length > 0;
  }

  async isCheckboxPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.checkbox);
    return elements.length > 0;
  }

  async isInputFieldEnabled(): Promise<boolean> {
    const element = await this.driver.findElement(this.inputField);
    return await element.isEnabled();
  }

  async getMessage(): Promise<string> {
    const element = await this.driver.findElement(this.message);
    return await element.getText();
  }
}
