import { By } from "selenium-webdriver";
import { World } from "../../support/driverController";
import { BasePage } from "../basePage";

export class ContextMenuPage extends BasePage {

  // Locators
  private readonly hotSpot = By.id("hot-spot");

  constructor(world: World) {
    super(world);
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/context_menu";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async rightClickHotSpot(): Promise<void> {
    await this.rightClick(this.hotSpot);
  }

  async getAlertTextContent(): Promise<string> {
    const alert = await this.getAlert();
    return await alert.getText();
  }

  async acceptAlert(): Promise<void> {
    const alert = await this.getAlert();
    await alert.accept();
  }

  async dismissAlert(): Promise<void> {
    const alert = await this.getAlert();
    await alert.dismiss();
  }

  // Assertions
  async isHotSpotPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.hotSpot);
  }
}
