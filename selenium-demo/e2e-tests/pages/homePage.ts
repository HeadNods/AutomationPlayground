import { By } from "selenium-webdriver";
import { World } from "../support/driverController";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  constructor(world: World) {
    super(world);
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async clickLink(linkText: string): Promise<void> {
    const link = By.xpath(`//a[text()="${linkText}"]`);
     await this.click(link);
  }

  async clickLinkWithPartialText(partialText: string): Promise<void> {
    const link = By.xpath(`//a[contains(text(), "${partialText}")]`);
    await this.click(link);
  }

  async navigateBack(): Promise<void> {
    await this.navigatePage("back");
  }

  async navigateForward(): Promise<void> {
    await this.navigatePage("forward");
  }

  async refresh(): Promise<void> {
    await this.refreshPage();
  }

  async closeBrowser(): Promise<void> {
    await this.driver.close();
  }

  // Assertions
  async getPageTitle(): Promise<string> {
    return await this.getTitle();
  }

  async getCurrentUrl(): Promise<string> {
    return await this.getUrl();
  }

  async isLinkPresent(linkText: string): Promise<boolean> {
    const link = By.xpath(`//a[text()="${linkText}"]`);
    return await this.isElementDisplayed(link);
  }

  async isLinkWithPartialTextPresent(partialText: string): Promise<boolean> {
    const link = By.xpath(`//a[contains(text(), "${partialText}")]`);
    return await this.isElementDisplayed(link);
  }
}
