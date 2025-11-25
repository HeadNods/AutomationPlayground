import { By, WebDriver, WebElement } from "selenium-webdriver";
import { World } from "../support/driverController";

export class CheckboxesPage {
  private driver: WebDriver;

  // Locators
  private readonly checkboxForm = By.id("checkboxes");
  private readonly firstCheckbox = By.xpath("(//form[@id='checkboxes']//input)[1]");
  private readonly secondCheckbox = By.xpath("(//form[@id='checkboxes']//input)[2]");
  private readonly checkboxByIndex = (index: number) => By.xpath(`(//form[@id='checkboxes']//input)[${index}]`);
  private readonly allCheckboxes = By.xpath("//input[@type='checkbox']");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/checkboxes";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickFirstCheckbox(): Promise<void> {
    const element = await this.driver.findElement(this.firstCheckbox);
    await element.click();
  }

  async clickSecondCheckbox(): Promise<void> {
    const element = await this.driver.findElement(this.secondCheckbox);
    await element.click();
  }

  async clickCheckboxByIndex(index: number): Promise<void> {
    const element = await this.driver.findElement(this.checkboxByIndex(index));
    await element.click();
  }

  async toggleCheckbox(index: number): Promise<void> {
    const element = await this.driver.findElement(this.checkboxByIndex(index));
    await element.click();
  }

  // Assertions
  async isFirstCheckboxChecked(): Promise<boolean> {
    const element = await this.driver.findElement(this.firstCheckbox);
    return await element.isSelected();
  }

  async isSecondCheckboxChecked(): Promise<boolean> {
    const element = await this.driver.findElement(this.secondCheckbox);
    return await element.isSelected();
  }

  async isCheckboxCheckedByIndex(index: number): Promise<boolean> {
    const element = await this.driver.findElement(this.checkboxByIndex(index));
    return await element.isSelected();
  }

  async getFirstCheckbox(): Promise<WebElement> {
    return await this.driver.findElement(this.firstCheckbox);
  }

  async getSecondCheckbox(): Promise<WebElement> {
    return await this.driver.findElement(this.secondCheckbox);
  }

  async isCheckboxFormPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.checkboxForm);
    return elements.length > 0;
  }
}
