import { Given, When } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { ContextMenuPage } from "../pages/contextMenuPage";

// Navigation
Given(
  /^I navigate to the Context Menu page$/,
  async function (this: World) {
    this.contextMenuPage = new ContextMenuPage(this);
    await this.contextMenuPage.navigate();
  }
);

// Right-click action
When(
  /^I right-click on the hot-spot$/,
  async function (this: World) {
    await this.contextMenuPage.rightClickHotSpot();
  }
);

// Note: Alert handling steps are defined in javascriptAlertsPageSteps.ts
// to avoid duplicate step definitions
