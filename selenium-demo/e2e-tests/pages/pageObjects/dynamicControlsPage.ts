import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class DynamicControlsPage extends BasePage  {

  // Locators
  private readonly removeButton = By.xpath("//button[text()='Remove']");
  private readonly addButton = By.xpath("//button[text()='Add']");
  private readonly enableButton = By.xpath("//button[text()='Enable']");
  private readonly disableButton = By.xpath("//button[text()='Disable']");
  private readonly checkbox = By.xpath("//input[@type='checkbox']");
  private readonly inputField = By.xpath("//input[@type='text']");
  private readonly message = By.id("message");

  constructor(world: World) {
    super(world)
  }

  // Page URL
  readonly url = "https://the-internet.herokuapp.com/dynamic_controls";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickRemoveButton(): Promise<void> {
    await this.click(this.removeButton);
  }

  async clickAddButton(): Promise<void> {
    await this.click(this.addButton);
  }

  async clickEnableButton(): Promise<void> {
    await this.click(this.enableButton);
  }

  async clickDisableButton(): Promise<void> {
    await this.click(this.disableButton);
  }

  async waitForAddButtonToDisplay(timeoutInSeconds: number = 10): Promise<void> {
    await this.waitForElementToBeLocated(this.addButton, timeoutInSeconds);
    await this.waitForElementToDisplay(this.addButton, timeoutInSeconds);
  }

  async waitForRemoveButtonToDisplay(timeoutInSeconds: number = 10): Promise<void> {
    await this.waitForElementToBeLocated(this.removeButton, timeoutInSeconds);
    await this.waitForElementToDisplay(this.removeButton, timeoutInSeconds);
  }

  // Assertions
  async isRemoveButtonPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.removeButton);
  }

  async isAddButtonPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.addButton);
  }

  async isCheckboxPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.checkbox);
  }

  async isInputFieldEnabled(): Promise<boolean> {
    const element = await this.getElement(this.inputField);
    return await element.isEnabled();
  }

  async getMessage(): Promise<string> {
    return await this.getElementText(this.message);
  }
}
