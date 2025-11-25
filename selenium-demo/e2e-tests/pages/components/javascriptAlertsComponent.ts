import { By, WebDriver } from "selenium-webdriver";
import { World } from "../../support/driverController";

export class JavascriptAlertsComponent {
  private driver: WebDriver;

  // Locators
  private readonly jsAlertButton = By.xpath("//button[text()='Click for JS Alert']");
  private readonly jsConfirmButton = By.xpath("//button[text()='Click for JS Confirm']");
  private readonly jsPromptButton = By.xpath("//button[text()='Click for JS Prompt']");
  private readonly result = By.id("result");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/javascript_alerts";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickJSAlertButton(): Promise<void> {
    const element = await this.driver.findElement(this.jsAlertButton);
    await element.click();
  }

  async clickJSConfirmButton(): Promise<void> {
    const element = await this.driver.findElement(this.jsConfirmButton);
    await element.click();
  }

  async clickJSPromptButton(): Promise<void> {
    const element = await this.driver.findElement(this.jsPromptButton);
    await element.click();
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

  async sendTextToAlert(text: string): Promise<void> {
    const alert = await this.driver.switchTo().alert();
    await alert.sendKeys(text);
  }

  // Assertions
  async getResultText(): Promise<string> {
    const element = await this.driver.findElement(this.result);
    return await element.getText();
  }

  async isJSAlertButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.jsAlertButton);
    return elements.length > 0;
  }

  async isJSConfirmButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.jsConfirmButton);
    return elements.length > 0;
  }

  async isJSPromptButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.jsPromptButton);
    return elements.length > 0;
  }
}
