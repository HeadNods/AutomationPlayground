import { By, WebDriver } from "selenium-webdriver";
import { World } from "../support/driverController";

export class LoginPage {
  private driver: WebDriver;

  // Locators
  private readonly usernameInput = By.id("username");
  private readonly passwordInput = By.id("password");
  private readonly loginButton = By.xpath("//button[@type='submit']");
  private readonly submitButtonByClass = By.className("radius");
  private readonly flashMessage = By.id("flash");
  private readonly logoutButton = By.xpath("//a[@href='/logout']");
  private readonly loginHeader = By.xpath("//h2");

  constructor(world: World) {
    this.driver = world.driver;
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/login";
  readonly secureAreaUrl = "http://the-internet.herokuapp.com/secure";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async enterUsername(username: string): Promise<void> {
    const element = await this.driver.findElement(this.usernameInput);
    await element.clear();
    await element.sendKeys(username);
  }

  async enterPassword(password: string): Promise<void> {
    const element = await this.driver.findElement(this.passwordInput);
    await element.clear();
    await element.sendKeys(password);
  }

  async clickLoginButton(): Promise<void> {
    const element = await this.driver.findElement(this.loginButton);
    await element.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async clickLogoutButton(): Promise<void> {
    const element = await this.driver.findElement(this.logoutButton);
    await element.click();
  }

  // Assertions
  async getFlashMessageText(): Promise<string> {
    const element = await this.driver.findElement(this.flashMessage);
    return await element.getText();
  }

  async getFlashMessageClass(): Promise<string> {
    const element = await this.driver.findElement(this.flashMessage);
    const classAttr = await element.getAttribute("class");
    return classAttr || "";
  }

  async getUsernameValue(): Promise<string> {
    const element = await this.driver.findElement(this.usernameInput);
    return await element.getAttribute("value");
  }

  async getPasswordValue(): Promise<string> {
    const element = await this.driver.findElement(this.passwordInput);
    return await element.getAttribute("value");
  }

  async getUsernameAttribute(attribute: string): Promise<string> {
    const element = await this.driver.findElement(this.usernameInput);
    return await element.getAttribute(attribute) || "";
  }

  async getPasswordAttribute(attribute: string): Promise<string> {
    const element = await this.driver.findElement(this.passwordInput);
    return await element.getAttribute(attribute) || "";
  }

  async getLoginButtonAttribute(attribute: string): Promise<string> {
    const element = await this.driver.findElement(this.submitButtonByClass);
    return await element.getAttribute(attribute) || "";
  }

  async getHeaderText(): Promise<string> {
    const element = await this.driver.findElement(this.loginHeader);
    return await element.getText();
  }

  async isLogoutButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.logoutButton);
    return elements.length > 0;
  }

  async isLoginButtonPresent(): Promise<boolean> {
    const elements = await this.driver.findElements(this.loginButton);
    return elements.length > 0;
  }
}
