import { By, WebDriver } from "selenium-webdriver";
import { World } from "../support/driverController";

export class DragAndDropPage {
  private driver: WebDriver;

  // Locators
  private readonly columnA = By.id("column-a");
  private readonly columnB = By.id("column-b");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/drag_and_drop";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async dragColumnAToColumnB(): Promise<void> {
    const sourceElement = await this.driver.findElement(this.columnA);
    const targetElement = await this.driver.findElement(this.columnB);
    const actions = this.driver.actions({ async: true });
    await actions.dragAndDrop(sourceElement, targetElement).perform();
  }

  async dragColumnBToColumnA(): Promise<void> {
    const sourceElement = await this.driver.findElement(this.columnB);
    const targetElement = await this.driver.findElement(this.columnA);
    const actions = this.driver.actions({ async: true });
    await actions.dragAndDrop(sourceElement, targetElement).perform();
  }

  // Assertions
  async getColumnAText(): Promise<string> {
    const element = await this.driver.findElement(this.columnA);
    return await element.getText();
  }

  async getColumnBText(): Promise<string> {
    const element = await this.driver.findElement(this.columnB);
    return await element.getText();
  }

  async isColumnAPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.columnA);
    return elements.length > 0;
  }

  async isColumnBPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.columnB);
    return elements.length > 0;
  }
}
