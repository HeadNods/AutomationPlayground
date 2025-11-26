import { By } from "selenium-webdriver";
import { World } from "../support/driverController";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = By.id("username");
  private readonly passwordInput = By.id("password");
  private readonly loginButton = By.xpath("//button[@type='submit']");
  private readonly submitButtonByClass = By.className("radius");
  private readonly flashMessage = By.id("flash");
  private readonly logoutButton = By.xpath("//a[@href='/logout']");
  private readonly loginHeader = By.xpath("//h2");

  constructor(world: World) {
    super(world);
  }

  // Page URL
  readonly url = "http://the-internet.herokuapp.com/login";
  readonly secureAreaUrl = "http://the-internet.herokuapp.com/secure";

  // Actions
  async navigate(): Promise<void> {
    await this.driver.get(this.url);
  }

  async enterUsername(username: string): Promise<void> {
    await this.clearText(this.usernameInput);
    await this.enterText(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.clearText(this.passwordInput);
    await this.enterText(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async clickLogoutButton(): Promise<void> {
    await this.click(this.logoutButton);
  }

  // Assertions
  async getFlashMessageText(): Promise<string> {
    return await this.getElementText(this.flashMessage);
  }

  async getFlashMessageClass(): Promise<string> {
    return (await this.getElementAttribute(this.flashMessage, "class")) || "";
  }

  async getUsernameValue(): Promise<string> {
    return await this.getElementAttribute(this.usernameInput, "value");
  }

  async getPasswordValue(): Promise<string> {
    return await this.getElementAttribute(this.passwordInput, "value");
  }

  async getUsernameAttribute(attribute: string): Promise<string> {
    return (await this.getElementAttribute(this.usernameInput, attribute)) || "";
  }

  async getPasswordAttribute(attribute: string): Promise<string> {
    return (await this.getElementAttribute(this.passwordInput, attribute)) || "";
  }

  async getLoginButtonAttribute(attribute: string): Promise<string> {
    return (await this.getElementAttribute(this.submitButtonByClass, attribute)) || "";
  }

  async getHeaderText(): Promise<string> {
    return await this.getElementText(this.loginHeader);
  }

  async isLogoutButtonPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.logoutButton);
  }

  async isLoginButtonPresent(): Promise<boolean> {
    return await this.isElementDisplayed(this.loginButton);
  }
}
