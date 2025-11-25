import { By, WebDriver } from "selenium-webdriver";
import { World } from "../support/driverController";

export class HomePage {
  private driver: WebDriver;

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickLink(linkText: string): Promise<void> {
    const link = By.xpath(`//a[text()="${linkText}"]`);
    const element = await this.driver.findElement(link);
    await element.click();
  }

  async clickLinkWithPartialText(partialText: string): Promise<void> {
    const link = By.xpath(`//a[contains(text(), "${partialText}")]`);
    const element = await this.driver.findElement(link);
    await element.click();
  }

  async navigateBack(): Promise<void> {
    await this.driver.navigate().back();
  }

  async navigateForward(): Promise<void> {
    await this.driver.navigate().forward();
  }

  async refresh(): Promise<void> {
    await this.driver.navigate().refresh();
  }

  async closeBrowser(): Promise<void> {
    await this.driver.close();
  }

  // Assertions
  async getPageTitle(): Promise<string> {
    return await this.driver.getTitle();
  }

  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  async isLinkPresent(linkText: string): Promise<boolean> {
    const link = By.xpath(`//a[text()="${linkText}"]`);
    const elements = await this.driver.findElements(link);
    return elements.length > 0;
  }

  async isLinkWithPartialTextPresent(partialText: string): Promise<boolean> {
    const link = By.xpath(`//a[contains(text(), "${partialText}")]`);
    const elements = await this.driver.findElements(link);
    return elements.length > 0;
  }
}
