import { Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import * as base from "../functions/base";
import * as page from "../functions/exampleAssertionFunctions";
import * as navigate from "../functions/exampleNavigationFunctions";
import { isSelectorType } from "../functions/base";



Then(
  /^I click on (?:element|button|link|menu item|selection|input) having (id|name|class|xpath|css) "(.*?)" and text "(.*?)"$/,
  async function (
    this: World,
    elementType: string,
    typeValue: string,
    text: string | undefined,
  ) {
    await base.click(
      this,
      "xpath",
      `//*[text()='${text}' and @${elementType}='${typeValue}']`,
    );
  },
);

Then(
  /^I click on (?:element|button|link|menu item|selection|input) having (id|name|class|xpath|css) "(.*?)"$/,
  async function (this: World, elementType: string, typeValue: string) {
    await base.click(this, elementType as base.SelectorType, typeValue);
  },
);

Then(
  /^I click on element having (id|name|class|xpath|css) "(.*?)" if it exists?$/,
  async function (this: World, elementType: string, typeValue: string) {
    base.validateLocater(elementType);
    await base.clickIfExists(this, elementType, typeValue, "3");
  },
);

Then(
  /^I forcefully click on (?:element|button|link|menu item|selection|input) having (id|name|class|xpath|css) "(.*?)"$/,
  async function (this: World, elementType: string, typeValue: string) {
    base.isSelectorType(elementType);
    await base.clickForcefully(this, elementType, typeValue);
  },
);

Then(
  /^I right click on (?:element|button|link|menu item|selection|input) having (id|name|class|xpath|css) "(.*?)"$/,
  async function (this: World, elementType: string, typeValue: string) {
    base.isSelectorType(elementType);
    await base.rightClick(this, elementType, typeValue);
  },
);

Then(
  /^I double click on (?:element|button|link|menu item|selection|input) having (id|name|class|xpath|css) "(.*?)"$/,
  async function (this: World, elementType: string, typeValue: string) {
    base.isSelectorType(elementType);
    await base.doubleClick(this, elementType, typeValue);
  },
);

Then(
  /^I click on link having text "(.*?)"$/,
  async function (this: World, text: string) {
    await base.click(this, "xpath", `//a[text()="${text}"]`);
  },
);

Then(
  /^I click on link having partial text "(.*?)"$/,
  async function (this: World, text: string) {
    await base.click(this, "xpath", `//a/[contains(text(), "${text}")]`);
  },
);

Then(
  /^I tap on (?:element|button|link|menu item|selection|input) having (id|name|class|xpath|css) "(.*?)"$/,
  async function (this: World, elementType: string, typeValue: string) {
    base.isSelectorType(elementType);
    await base.click(this, elementType as base.SelectorType, typeValue);
  },
);

Then(
  /^I drag element having (id|name|class|xpath|css) "(.*?)" and drop it on element having (id|name|class|xpath|css) "(.*?)"$/,
  async function (
    this: World,
    sourceType: string,
    sourceTypeValue: string,
    targetType: string,
    targetTypeValue: string,
  ) {
    await navigate.dragAndDrop(
      this,
      sourceType,
      sourceTypeValue,
      targetType,
      targetTypeValue,
    );
  },
);
