import { By, WebDriver } from "selenium-webdriver";
import { World } from "../support/driverController";

export class ContextMenuPage {
  private driver: WebDriver;

  // Locators
  private readonly hotSpot = By.id("hot-spot");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/context_menu";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async rightClickHotSpot(): Promise<void> {
    const element = await this.driver.findElement(this.hotSpot);
    const actions = this.driver.actions({ async: true });
    await actions.contextClick(element).perform();
  }

  async getAlertText(): Promise<string> {
    const alert = await this.driver.switchTo().alert();
    return await alert.getText();
  }

  async acceptAlert(): Promise<void> {
    const alert = await this.driver.switchTo().alert();
    await alert.accept();
  }

  async dismissAlert(): Promise<void> {
    const alert = await this.driver.switchTo().alert();
    await alert.dismiss();
  }

  // Assertions
  async isHotSpotPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.hotSpot);
    return elements.length > 0;
  }
}
