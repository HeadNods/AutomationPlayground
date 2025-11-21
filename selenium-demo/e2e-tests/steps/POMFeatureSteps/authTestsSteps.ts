import { Then } from "@cucumber/cucumber";
import { World } from "../../support/driverController";
import * as keys from "../../functions/exampleKeyFunctions";
import { Key } from "selenium-webdriver";
import * as assertions from "../../functions/exampleAssertionFunctions";

Then(
    /^There is a (?:basic|digest) auth popup/,
    async function (this: World) {
        //Not sure how to check this with selenium
    },
);

Then(
  /^I enter "(.*)" into (?:digest|basic) auth username field$/,
  async function (this: World, input: string) {
    this.driver.actions({ async: false, bridge: true }).sendKeys(input).perform();
  },
);

Then(
  /^I enter "(.*)" into (?:digest|basic) auth password field$/,
  async function (this: World, input: string) {
    await keys.tab(this);
    this.driver.actions({ async: false, bridge: true }).sendKeys(input).perform();
  },
);

Then(
    /^I submit the (?:basic|digest) auth popup$/,
    async function (this: World) {
        this.driver.actions({ async: false, bridge: true }).sendKeys(Key.ENTER).perform();
    },
);

Then(
    /^I should see the header "(.*)" as "(.*)"$/,
    async function (this: World, tag: string, expectedHeader: string) {
        await assertions.checkElementText(this, "css", tag, expectedHeader);
    },
);

Then(
    /^I should see a flash message having class "(.*)" with text as "(.*)"$/,
    async function (this: World, expectedClass: string, expectedText: string) {
        await assertions.checkElementAttribute(this, "id", "flash", "class", expectedClass);
        await assertions.checkElementPartialText(this, "id", "flash", expectedText);
    },
);