import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../support/driverController";
import { DropdownPage } from "../pages/pageObjects/dropdownPage";
import assert from "assert";

// Navigation
Given(
    /^I navigate to the Dropdown page$/,
    async function (this: World) {
        this.dropdownPage = new DropdownPage(this);
        await this.dropdownPage.navigate();
        const pageTitle = await this.dropdownPage.getPageTitle();
        assert.strictEqual(pageTitle, "The Internet");
        const pageHeader = await this.dropdownPage.getHeaderText();
        assert.strictEqual(pageHeader, "Dropdown List");
    }
);
// Actions
When(
    /^I select option (1|2) from the dropdown$/,
    async function (this: World, optionNumber: string) {
        if (optionNumber === "1") {
            await this.dropdownPage.selectOption1();
        } else if (optionNumber === "2") {
            await this.dropdownPage.selectOption2();
        } else {
            throw new Error(`Invalid option number: ${optionNumber}`);
        }
    }
);

// assertions
Then(
    /^the selected option contains the text "(.*?)"$/,
    async function (this: World, expectedText: string) {
        const actualText = await this.dropdownPage.getSelectedOptionText();
        assert.strictEqual(actualText, expectedText);
    }
);
Then(
    /^the selected option is option (0|1|2)$/,
    async function (this: World, expectedOption: string) {
        let isOption1Selected: boolean = await this.dropdownPage.isOption1Selected();
        let isOption2Selected: boolean = await this.dropdownPage.isOption2Selected();
        let isDisabledOptionSelected: boolean = await this.dropdownPage.isDisabledOptionSelected();
        if (expectedOption === "1") {
            assert.strictEqual(isOption1Selected, true);
            assert.strictEqual(isOption2Selected, false);
            assert.strictEqual(isDisabledOptionSelected, false);
        } else if (expectedOption === "2") {
            assert.strictEqual(isOption2Selected, true);
            assert.strictEqual(isOption1Selected, false);
            assert.strictEqual(isDisabledOptionSelected, false);
        } else if (expectedOption === "0") {
            assert.strictEqual(isDisabledOptionSelected, true);
            assert.strictEqual(isOption1Selected, false);
            assert.strictEqual(isOption2Selected, false);
        }
        else {
            throw new Error(`Invalid option number: ${expectedOption}`);
        }
    }
);
Then(
    /^the base dropdown option is disabled$/,
    async function (this: World) {
        const isDisabled = await this.dropdownPage.isDisabledOptionDisabled();
        assert.strictEqual(isDisabled, true);
    }
);