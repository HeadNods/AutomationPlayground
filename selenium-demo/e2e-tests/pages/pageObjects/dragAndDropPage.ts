import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class DragAndDropPage extends BasePage {

  // Locators
  private readonly columnA = By.id("column-a");
  private readonly columnB = By.id("column-b");

  constructor(world: World) {
    super(world)
  }

  // Page URL
  readonly url = "https://the-internet.herokuapp.com/drag_and_drop";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async dragColumnAToColumnB(): Promise<void> {
    //const sourceElement = await this.getElement(this.columnA);
    //const targetElement = await this.getElement(this.columnB);
    await this.dragAndDrop(this.columnA, this.columnB);
    //const actions = this.driver.actions({ async: true });
    //await actions.dragAndDrop(sourceElement, targetElement).perform();
  }

  async dragColumnBToColumnA(): Promise<void> {
    //const sourceElement = await this.getElement(this.columnB);
    //const targetElement = await this.getElement(this.columnA);
    //const actions = this.driver.actions({ async: true });
    //await actions.dragAndDrop(sourceElement, targetElement).perform();
    await this.dragAndDrop(this.columnB, this.columnA);
  }

  // Assertions
  async getColumnAText(): Promise<string> {
    return await this.getElementText(this.columnA);
  }

  async getColumnBText(): Promise<string> {
    return await this.getElementText(this.columnB);
  }

  async isColumnAPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.columnA);
  }

  async isColumnBPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.columnB);
  }
}
