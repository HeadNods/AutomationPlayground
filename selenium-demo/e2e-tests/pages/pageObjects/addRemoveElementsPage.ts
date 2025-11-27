import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class AddRemoveElementsPage extends BasePage {

  // Locators
  private readonly addElementButton = By.xpath("//button[text()='Add Element']");
  private readonly deleteButton = By.className("added-manually");
  private readonly deleteButtons = By.xpath("//button[@class='added-manually']");

  constructor(world: World) {
    super(world);
  }

  // Page URL
  readonly url = "https://the-internet.herokuapp.com/add_remove_elements/";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickAddElement(): Promise<void> {
    await this.click(this.addElementButton);
  }

  async clickDeleteButton(): Promise<void> {
    await this.click(this.deleteButton);
  }

  async getDeleteButtonCount(): Promise<number> {
    return await this.getElementsCount(this.deleteButtons);
  }

  // Assertions
  async isDeleteButtonPresent(): Promise<boolean> {
    return this.isElementDisplayed(this.deleteButton);
  }

  async getAddElementButtonText(): Promise<string> {
    return await this.getElementText(this.addElementButton);
  }
}
