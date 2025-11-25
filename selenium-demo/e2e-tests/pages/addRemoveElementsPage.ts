import { By, WebDriver, WebElement } from "selenium-webdriver";
import { World } from "../support/driverController";

export class AddRemoveElementsPage {
  private driver: WebDriver;

  // Locators
  private readonly addElementButton = By.xpath("//button[text()='Add Element']");
  private readonly deleteButton = By.className("added-manually");
  private readonly deleteButtons = By.xpath("//button[@class='added-manually']");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/add_remove_elements/";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickAddElement(): Promise<void> {
    const element = await this.driver.findElement(this.addElementButton);
    await element.click();
  }

  async clickDeleteButton(): Promise<void> {
    const element = await this.driver.findElement(this.deleteButton);
    await element.click();
  }

  async getDeleteButtonCount(): Promise<number> {
    const elements = await this.driver.findElements(this.deleteButtons);
    return elements.length;
  }

  // Assertions
  async isDeleteButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.deleteButton);
    return elements.length > 0;
  }

  async getAddElementButtonText(): Promise<string> {
    const element = await this.driver.findElement(this.addElementButton);
    return await element.getText();
  }

  async getAddElementButton(): Promise<WebElement> {
    return await this.driver.findElement(this.addElementButton);
  }
}
