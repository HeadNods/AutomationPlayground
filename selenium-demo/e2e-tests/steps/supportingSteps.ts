import { Given, Then, When } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { AddRemoveElementsPage } from "../pages/pageObjects/addRemoveElementsPage";
import { CheckboxesPage } from "../pages/pageObjects/checkboxesPage";
import { ContextMenuPage } from "../pages/pageObjects/contextMenuPage";
import { DragAndDropPage } from "../pages/pageObjects/dragAndDropPage";
import { DynamicControlsPage } from "../pages/pageObjects/dynamicControlsPage";
import { HomePage } from "../pages/pageObjects/homePage";
import { InputsPage } from "../pages/pageObjects/inputsPage";
import { LoginPage } from "../pages/pageObjects/loginPage";
import { JavascriptAlertsComponent } from "../pages/components/javascriptAlertsComponent";
import { BrokenImagesPage } from "../pages/pageObjects/brokenImagesPage";
import { ChallengingDOMPage } from "../pages/pageObjects/challengingDOMPage";
import { DropdownPage } from "../pages/pageObjects/dropdownPage";
import { DynamicLoadingPage } from "../pages/pageObjects/dynamicLoadingPage";

// Initialize page objects after clicking links from home page
const initializePage = async function (this: World, pageName: string) {
  switch (pageName) {
    case "Home":
      this.homePage = new HomePage(this);
      break;
    case "Add/Remove Elements":
      this.addRemoveElementsPage = new AddRemoveElementsPage(this);
      break;
    case "Checkboxes":
      this.checkboxesPage = new CheckboxesPage(this);
      break;
    case "Context Menu":
      this.contextMenuPage = new ContextMenuPage(this);
      break;
    case "Drag and Drop":
      this.dragAndDropPage = new DragAndDropPage(this);
      break;
    case "Dynamic Controls":
      this.dynamicControlsPage = new DynamicControlsPage(this);
      break;
    case "Inputs":
      this.inputsPage = new InputsPage(this);
      break;
    case "JavaScript Alerts":
      this.javascriptAlertsComponent = new JavascriptAlertsComponent(this);
      break;
    case "Login":
      this.loginPage = new LoginPage(this);
      break;
    case "Broken Images":
      this.brokenImagesPage = new BrokenImagesPage(this);
      break;
    case "Challenging DOM":
      this.challengingDOMPage = new ChallengingDOMPage(this);
      break;
    case "Dropdown":
      this.dropdownPage = new DropdownPage(this);
      break;
    case "Dynamic Loading":
      this.dynamicLoadingPage = new DynamicLoadingPage(this);
      break;
    default:
      throw new Error(`Unknown page: ${pageName}. Please add it to the supportingSteps.ts switch statement.`);
  }
};

When(/^I am on the (.*?) (?:page|component)$/, initializePage);
Then(/^I should be on the (.*?) (?:page|component)$/, initializePage);
// Wait operations
When(
  /^I wait for (\d+) seconds?$/,
  async function (this: World, seconds: string) {
    await this.driver.sleep(parseInt(seconds) * 1000);
  }
);