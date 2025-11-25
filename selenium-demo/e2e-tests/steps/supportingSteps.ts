import { Given, Then, When } from "@cucumber/cucumber";
import { AddRemoveElementsPage } from "../pages/addRemoveElementsPage";
import { CheckboxesPage } from "../pages/checkboxesPage";
import { ContextMenuPage } from "../pages/contextMenuPage";
import { DragAndDropPage } from "../pages/dragAndDropPage";
import { DynamicControlsPage } from "../pages/dynamicControlsPage";
import { HomePage } from "../pages/homePage";
import { InputsPage } from "../pages/inputsPage";
import { LoginPage } from "../pages/loginPage";
import { JavascriptAlertsComponent } from "../pages/components/javascriptAlertsComponent";
import { World } from "../support/driverController";

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
    default:
      throw new Error(`Unknown page: ${pageName}. Please add it to the supportingSteps.ts switch statement.`);
  }
};

Given(/^I (?:should be|am) on the (.*?) (?:page|component)$/, initializePage);
When(/^I (?:should be|am) on the (.*?) (?:page|component)$/, initializePage);
Then(/^I should be on the (.*?) (?:page|component)$/, initializePage);