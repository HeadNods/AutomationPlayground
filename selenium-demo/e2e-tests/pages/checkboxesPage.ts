import { By } from "selenium-webdriver";
import { World } from "../support/driverController";
import { BasePage } from "./basePage";

export class CheckboxesPage extends BasePage {

  // Locators
  private readonly checkboxForm = By.id("checkboxes");
  private readonly firstCheckbox = By.xpath("(//form[@id='checkboxes']//input)[1]");
  private readonly secondCheckbox = By.xpath("(//form[@id='checkboxes']//input)[2]");
  private readonly checkboxByIndex = (index: number) => By.xpath(`(//form[@id='checkboxes']//input)[${index}]`);
  private readonly allCheckboxes = By.xpath("//input[@type='checkbox']");

  constructor(world: World) {
    super(world);
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/checkboxes";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickFirstCheckbox(): Promise<void> {
    await this.click(this.firstCheckbox);
  }

  async clickSecondCheckbox(): Promise<void> {
    await this.click(this.secondCheckbox);
  }

  async clickCheckboxByIndex(index: number): Promise<void> {
    await this.click(this.checkboxByIndex(index));
  }

  async toggleCheckbox(index: number): Promise<void> {
    await this.click(this.checkboxByIndex(index));
  }

  // Assertions
  async isFirstCheckboxChecked(): Promise<boolean> {
    const element = await this.getElement(this.firstCheckbox);
    return await element.isSelected();
  }

  async isSecondCheckboxChecked(): Promise<boolean> {
    const element = await this.getElement(this.secondCheckbox);
    return await element.isSelected();
  }

  async isCheckboxCheckedByIndex(index: number): Promise<boolean> {
    const element = await this.getElement(this.checkboxByIndex(index));
    return await element.isSelected();
  }

  async isCheckboxFormPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.checkboxForm);
  }
}
