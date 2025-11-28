import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { World } from "../../support/driverController";

export class ChallengingDOMPage extends BasePage {
    //Locators
    private readonly header = By.css("div.example h3");
    private readonly buttons = By.css("div.large-2 a.button");
    private readonly firstButton = By.css("div.large-2 a:nth-of-type(1)");
    private readonly secondButton = By.css("div.large-2 a:nth-of-type(2)");
    private readonly thirdButton = By.css("div.large-2 a:nth-of-type(3)");
    private readonly tableHeaders = By.css("table > thead th");
    private readonly tableRows = By.css("table > tbody > tr");
    private readonly columnOneCells = By.css("table > tbody > tr > td:nth-of-type(1)");
    private readonly columnTwoCells = By.css("table > tbody > tr > td:nth-of-type(2)");
    private readonly columnThreeCells = By.css("table > tbody > tr > td:nth-of-type(3)");
    private readonly columnFourCells = By.css("table > tbody > tr > td:nth-of-type(4)");
    private readonly columnFiveCells = By.css("table > tbody > tr > td:nth-of-type(5)");
    private readonly columnSixCells = By.css("table > tbody > tr > td:nth-of-type(6)");
    private readonly columnSevenCells = By.css("table > tbody > tr > td:nth-of-type(7)");
    private readonly editButtons = By.css("table > tbody > tr > td > a:nth-child(1)");
    private readonly deleteButtons = By.css("table > tbody > tr > td > a:nth-child(2)");
    private readonly answerScript = By.css("div#content > script");
    //Constructor
    constructor(world: World) {
        super(world);
    }
    //Page URL
    readonly url = "https://the-internet.herokuapp.com/challenging_dom"
    //Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }
    async getTitleText(): Promise<string> {
        return await this.getTitle()
    }
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }
    async getNumberOfButtons(): Promise<number> {
        return await this.getElementsCount(this.buttons);
    }
    async getFirstButtonText(): Promise<string> {
        return await this.getElementText(this.firstButton);
    }
    async getSecondButtonText(): Promise<string> {
        return await this.getElementText(this.secondButton);
    }
    async getThirdButtonText(): Promise<string> {
        return await this.getElementText(this.thirdButton);
    }
    async getFirstButtonId(): Promise<string> {
        return await this.getElementAttribute(this.firstButton, "id");
    }
    async getSecondButtonId(): Promise<string> {
        return await this.getElementAttribute(this.secondButton, "id");
    }
    async getThirdButtonId(): Promise<string> {
        return await this.getElementAttribute(this.thirdButton, "id");
    }
    async clickFirstButton(): Promise<void> {
        await this.click(this.firstButton);
    }
    async clickSecondButton(): Promise<void> {
        await this.click(this.secondButton);
    }
    async clickThirdButton(): Promise<void> {
        await this.click(this.thirdButton);
    }
    async getTableHeadersText(): Promise<string[]> {
        let headers = await this.getElements(this.tableHeaders);
        let headerTexts: string[] = [];
        for (const header of headers) {
            const text = await header.getText();
            headerTexts.push(text);
        }
        return headerTexts;
    }
    async getNumberOfTableRows(): Promise<number> {
        return await this.getElementsCount(this.tableRows);
    }
    async getColumnOneCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnOneCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getColumnTwoCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnTwoCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getColumnThreeCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnThreeCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getColumnFourCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnFourCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getColumnFiveCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnFiveCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getColumnSixCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnSixCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getColumnSevenCellsText(): Promise<string[]> {
        let cells = await this.getElements(this.columnSevenCells);
        let cellTexts: string[] = [];
        for (const cell of cells) {
            const text = await cell.getText();
            cellTexts.push(text);
        }
        return cellTexts;
    }
    async getEditButtonsText(): Promise<string[]> {
        let buttons = await this.getElements(this.editButtons);
        let buttonTexts: string[] = [];
        for (const button of buttons) {
            const text = await button.getText();
            buttonTexts.push(text);
        }
        return buttonTexts;
    }
    async getDeleteButtonsText(): Promise<string[]> {
        let buttons = await this.getElements(this.deleteButtons);
        let buttonTexts: string[] = [];
        for (const button of buttons) {
            const text = await button.getText();
            buttonTexts.push(text);
        }
        return buttonTexts;
    }
    async getEditButtonsHref(): Promise<string[]> {
        let buttons = await this.getElements(this.editButtons);
        let buttonHrefs: string[] = [];
        for (const button of buttons) {
            const href = await button.getAttribute("href");
            buttonHrefs.push(href);
        }
        return buttonHrefs;
    }
    async getDeleteButtonsHref(): Promise<string[]> {
        let buttons = await this.getElements(this.deleteButtons);
        let buttonHrefs: string[] = [];
        for (const button of buttons) {
            const href = await button.getAttribute("href");
            buttonHrefs.push(href);
        }
        return buttonHrefs;
    }
    async getAnswerValueFromScript(): Promise<string> {
        await this.waitForElementToBeLocated(this.answerScript, 3);
        const scriptElement = await this.getElement(this.answerScript);
        const scriptContent = await scriptElement.getAttribute("innerHTML");
        const answerMatch = scriptContent.match(/'Answer: (\d+)'/);
        return answerMatch ? answerMatch[1] : "";
    }
}