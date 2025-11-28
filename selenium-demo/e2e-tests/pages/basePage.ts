import { By, until, WebDriver, WebElement, Key } from "selenium-webdriver";
import { World } from "../support/driverController";
import debug from "debug";
import chrome from "selenium-webdriver/chrome";

export type Logger = (self: World, message: string) => void;

export class BasePage {
    protected driver: WebDriver;
    protected world: World;
    protected debugLog: Logger;

    constructor(world: World) {
        this.world = world;
        this.driver = world.driver;
        this.debugLog = this.createLogger(this.constructor.name);
    }

    /**
     * Creates a logger for debugging
     * @param namespace - The namespace for the logger
     * @returns Logger function
     */
    protected createLogger(namespace: string): Logger {
        const debugLogger = debug(namespace);

        return (self: World, message: string) => {
            debugLogger(message);
            self.debugLog = `${self.debugLog}\n${namespace} ${message}`;
        };
    }

    /**
     * Logs duration of an operation
     * @param message - Description of the operation
     * @param startTime - Start time in milliseconds
     * @param waitTime - Expected wait time in seconds
     */
    protected duration(
        message: string,
        startTime: number,
        waitTime: number,
    ): void {
        const endTime = Date.now();
        const actualDurationMs = endTime - startTime;
        const actualDurationSec = (actualDurationMs / 1000).toFixed(2);

        this.debugLog(
            this.world,
            `${message} completed. Actual time taken: ${actualDurationSec} seconds. ` +
            `Configured wait time: ${waitTime} seconds.`,
        );
    }

    /**
     * Gets an element by locator
     * @param locator - By locator of the element
     * @returns Promise<WebElement>
     */
    protected async getElement(locator: By): Promise<WebElement> {
        return await this.driver.findElement(locator);
    }

    /**
     * Gets all elements found by locator
     * @param locator - By locator of the element
     * @returns Promise<WebElement[]>
     */
    protected async getElements(locator: By): Promise<WebElement[]> {
        return await this.driver.findElements(locator);
    }

    /**
   * Description: Gets the page title
   *
   * @returns Promise<string>
   */
    protected async getTitle() {
        return await this.driver.getTitle();
    }

    /**
     * Gets an attribute value from an element
     * @param locator - By locator of the element
     * @param attribute - Attribute name to retrieve
     * @returns Promise<string> - The attribute value
     */
    protected async getElementAttribute(
        locator: By,
        attribute: string,
    ): Promise<string> {
        const element = await this.getElement(locator);
        const attributeValue = await element.getAttribute(attribute);
        this.debugLog(
            this.world,
            `Element ${locator} has attribute ${attribute} with value of ${attributeValue}`,
        );

        return attributeValue;
    }

    /**
     * Gets the text of an element
     * @param locator - By locator of the element
     * @returns Promise<string> - The element text
     */
    protected async getElementText(locator: By): Promise<string> {
        await this.waitForElementToBeLocated(locator, 4);
        this.debugLog(this.world, `getting text of ${locator}`);
        return await (await this.getElement(locator)).getText();
    }

    /**
     * Gets the count of elements matching a locator
     * @param locator - By locator of the elements
     * @returns Promise<number> - Count of matching elements
     */
    protected async getElementsCount(locator: By): Promise<number> {
        this.debugLog(this.world, `looking for ${locator}`);
        const elementCount = (await this.driver.findElements(locator)).length;
        this.debugLog(this.world, `found ${elementCount} total`);
        return elementCount;
    }

    /**
     * Waits for a specified number of seconds
     * @param seconds - Number of seconds to wait
     * @returns Promise<void>
     */
    protected async wait(seconds: number): Promise<void> {
        this.debugLog(this.world, `waiting ${seconds}`);
        await this.driver.sleep(+seconds * 1000);
    }

    /**
     * Waits for an element to be located
     * @param locator - By locator of the element
     * @param seconds - Number of seconds to wait
     * @returns Promise<void>
     */
    protected async waitForElementToBeLocated(
        locator: By,
        seconds: number,
    ): Promise<void> {
        const secondsNum = parseInt(seconds.toString());
        const startTime = Date.now();

        this.debugLog(
            this.world,
            `waiting ${seconds} for element ${locator} to be located`,
        );
        await this.driver.wait(until.elementLocated(locator), secondsNum * 1000);

        this.duration("wait for element to be located", startTime, secondsNum);
    }

    /**
     * Waits for an element to be visible
     * @param locator - By locator of the element
     * @param seconds - Number of seconds to wait
     * @returns Promise<void>
     */
    protected async waitForElementToDisplay(
        locator: By,
        seconds: number,
    ): Promise<void> {
        const startTime = Date.now();
        this.debugLog(
            this.world,
            `waiting ${seconds} seconds for element ${locator} to display`,
        );
        const element = await this.driver.wait(
            until.elementLocated(locator),
            +seconds * 1000,
        );
        await this.driver.wait(
            until.elementIsVisible(element),
            +seconds * 1000,
        );
        this.duration("wait for element to display", startTime, seconds);
    }

    /**
     * Waits for an element with retry logic
     * @param locator - By locator of the element
     * @param seconds - Number of seconds to wait per attempt
     * @param retries - Number of retry attempts (default: 2)
     * @returns Promise<void>
     */
    protected async waitForElementWithRetry(
        locator: By,
        seconds: number,
        retries: number = 2,
    ): Promise<void> {
        let attempt = 0;

        while (attempt < retries) {
            try {
                attempt++;
                this.debugLog(
                    this.world,
                    `Attempt ${attempt} to find element ${locator}`,
                );
                await this.waitForElementToDisplay(locator, seconds);
                this.debugLog(
                    this.world,
                    `Element ${locator} found on attempt ${attempt}`,
                );
                return;
            } catch (error) {
                this.debugLog(
                    this.world,
                    `Attempt ${attempt} failed: ${error}. Retrying (${attempt}/${retries})...`,
                );
                if (attempt >= retries) {
                    throw new Error(
                        `Failed to find element ${locator} after ${retries} attempts.`,
                    );
                }
            }
        }
    }

    /**
     * Waits for an element to be clickable
     * @param locator - By locator of the element
     * @param seconds - Number of seconds to wait
     * @returns Promise<void>
     */
    protected async waitForElementToBeClickable(
        locator: By,
        seconds: number,
    ): Promise<void> {
        const startTime = Date.now();
        this.debugLog(
            this.world,
            `waiting ${seconds} for element ${locator} to be clickable`,
        );
        await this.waitForElementToBeLocated(locator, seconds);
        this.duration("wait for element to be clickable", startTime, seconds);
    }

    /**
     * Waits for page title to match
     * @param titleMatch - Expected page title
     * @param seconds - Number of seconds to wait
     * @returns Promise<void>
     */
    protected async waitForTitleToBe(
        titleMatch: string,
        seconds: number,
    ): Promise<void> {
        const startTime = Date.now();
        this.debugLog(this.world, `waiting ${seconds} for title to be ${titleMatch}`);
        await this.driver.wait(until.titleIs(titleMatch), +seconds * 1000);
        this.duration("wait for title to be", startTime, seconds);
    }

    /**
     * Clicks on an element
     * @param locator - By locator of the element
     * @param waitSeconds - Number of seconds to wait for element (default: 6)
     * @returns Promise<void>
     */
    protected async click(
        locator: By,
        waitSeconds: number | string = 6,
    ): Promise<void> {
        const waitSecondsNum = parseInt(waitSeconds.toString());
        const startTime = Date.now();

        this.debugLog(
            this.world,
            `clicking on ${locator} after waiting up to ${waitSeconds} seconds for it to be clickable`,
        );
        await this.waitForElementToBeClickable(locator, waitSecondsNum);

        try {
            await (await this.getElement(locator)).click();
        } catch (error) {
            error.message = error.message + ` could not click on ${locator}`;
            throw error;
        }

        this.duration("click", startTime, waitSecondsNum);
    }

    /**
     * Clicks on an element if it exists (doesn't throw error if not found)
     * @param locator - By locator of the element
     * @param waitSeconds - Number of seconds to wait for element (default: 6)
     * @returns Promise<void>
     */
    protected async clickIfExists(
        locator: By,
        waitSeconds: number | string = 6,
    ): Promise<void> {
        const startTime = Date.now();
        try {
            await this.waitForElementToBeClickable(
                locator,
                parseInt(waitSeconds.toString()),
            );

            this.debugLog(
                this.world,
                `looking for ${waitSeconds} seconds to click on ${locator}`,
            );
            await this.click(locator);
        } catch (error) {
            this.debugLog(this.world, `didn't find ${locator}`);
        }
        this.duration("clickIfExists", startTime, parseInt(waitSeconds.toString()));
    }

    /**
     * Double clicks on an element
     * @param locator - By locator of the element
     * @param waitSeconds - Number of seconds to wait for element (default: 6)
     * @returns Promise<void>
     */
    protected async doubleClick(
        locator: By,
        waitSeconds: number | string = 6,
    ): Promise<void> {
        const startTime = Date.now();
        try {
            await this.waitForElementToBeClickable(
                locator,
                parseInt(waitSeconds.toString()),
            );

            this.debugLog(this.world, `doubleClicking on ${locator}`);
            const doubleClickElement = await this.getElement(locator);
            await this.driver.actions().doubleClick(doubleClickElement).perform();
        } catch (error) {
            error.message = error.message + ` could not doubleClick on ${locator}`;
            throw error;
        }
        this.duration("doubleClick", startTime, parseInt(waitSeconds.toString()));
    }

    /**
     * Right clicks on an element
     * @param locator - By locator of the element
     * @param waitSeconds - Number of seconds to wait for element (default: 6)
     * @returns Promise<void>
     */
    protected async rightClick(
        locator: By,
        waitSeconds: number | string = 6,
    ): Promise<void> {
        const startTime = Date.now();
        try {
            await this.waitForElementToBeClickable(
                locator,
                parseInt(waitSeconds.toString()),
            );

            this.debugLog(this.world, `rightClicking on ${locator}`);
            const rightClickElement = await this.getElement(locator);
            await this.driver.actions().contextClick(rightClickElement).perform();
        } catch (error) {
            error.message = error.message + ` could not rightClick on ${locator}`;
            throw error;
        }
        this.duration("rightClick", startTime, parseInt(waitSeconds.toString()));
    }

    /**
     * Clicks on an element using JavaScript
     * @param locator - By locator of the element
     * @param waitSeconds - Number of seconds to wait for element (default: 6)
     * @returns Promise<void>
     */
    protected async clickForcefully(
        locator: By,
        waitSeconds: number | string = 6,
    ): Promise<void> {
        const startTime = Date.now();
        try {
            await this.waitForElementToBeClickable(
                locator,
                parseInt(waitSeconds.toString()),
            );

            this.debugLog(this.world, `clicking forcefully on ${locator}`);
            const forceClickElement = await this.getElement(locator);
            await this.driver.executeScript(
                "arguments[0].click();",
                forceClickElement,
            );
        } catch (error) {
            error.message =
                error.message + ` could not click forcefully on ${locator}`;
            throw error;
        }
        this.duration(
            "clickForcefully",
            startTime,
            parseInt(waitSeconds.toString()),
        );
    }

    /**
     * Submits a form element
     * @param locator - By locator of the element
     * @param waitSeconds - Number of seconds to wait for element (default: 6)
     * @returns Promise<void>
     */
    protected async submit(
        locator: By,
        waitSeconds: number | string = 6,
    ): Promise<void> {
        const startTime = Date.now();
        try {
            await this.waitForElementToBeClickable(
                locator,
                parseInt(waitSeconds.toString()),
            );

            this.debugLog(this.world, `submitting ${locator}`);
            await (await this.getElement(locator)).submit();
        } catch (error) {
            error.message = error.message + ` could not submit ${locator}`;
            throw error;
        }
        this.duration("submit", startTime, parseInt(waitSeconds.toString()));
    }

    /**
     * Hovers over an element
     * @param element - WebElement to hover over
     * @returns Promise<void>
     */
    protected async mouseOver(element: WebElement): Promise<void> {
        const actions = this.driver.actions({ async: false, bridge: true });
        await actions.move({ origin: element }).perform();
    }

    /**
     * Hovers over an element and clicks it
     * @param element - WebElement to hover over and click
     * @returns Promise<void>
     */
    protected async mouseOverAndClick(element: WebElement): Promise<void> {
        const actions = this.driver.actions({ async: false, bridge: true });
        await actions.move({ origin: element }).click().perform();
    }

    /**
     * Enters text into an element
     * @param locator - By locator of the element
     * @param text - Text to enter into the element
     * @returns Promise<void>
     */
    protected async enterText(locator: By, text: string): Promise<void> {
        this.debugLog(this.world, `Entering text into ${locator}`);
        await this.driver.findElement(locator).sendKeys(text);
    }

    /**
     * Clears text from an element
     * @param locator - By locator of the element
     * @returns Promise<void>
     */
    protected async clearText(locator: By): Promise<void> {
        this.debugLog(this.world, `clearing text from ${locator}`);
        await (await this.getElement(locator)).clear();

        // clear() doesn't work in all browsers
        // Check if we're on a mac
        if (process.platform === "darwin") {
            await (await this.getElement(locator)).sendKeys(Key.COMMAND + "a");
        } else {
            await (await this.getElement(locator)).sendKeys(Key.CONTROL + "a");
        }

        await (await this.getElement(locator)).sendKeys(Key.DELETE);
    }

    /**
     * Selects an option from a dropdown
     * @param locator - By locator of the dropdown element
     * @param optionLocator - By locator of the option to select
     * @returns Promise<void>
     */
    protected async selectOptionFromDropdown(
        locator: By,
        optionLocator: By,
    ): Promise<void> {
        this.debugLog(
            this.world,
            `selecting option ${optionLocator} from dropdown ${locator}`,
        );
        const dropdown = await this.getElement(locator);
        await dropdown.click();
        const chosenOption = await dropdown.findElement(optionLocator);
        await chosenOption.click();
    }

    /**
     * Selects all options from a multiselect dropdown
     * @param locator - By locator of the multiselect dropdown
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async selectAllOptionsFromMultiselectDropdown(
        locator: By,
    ): Promise<string> {
        this.debugLog(this.world, `selecting all options from dropdown ${locator}`);
        const dropdown = await this.getElement(locator);
        dropdown.findElements(By.tagName("option")).then(async (options) => {
            for (const option of options) {
                const isSelected = await option.isSelected();
                if (!isSelected) {
                    await option.click();
                }
            }
        });

        return "pending";
    }

    /**
     * Unselects all options from a multiselect dropdown
     * @param locator - By locator of the multiselect dropdown
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async unselectAllOptionsFromMultiselectDropdown(
        locator: By,
    ): Promise<string> {
        this.debugLog(
            this.world,
            `unselecting all options from dropdown ${locator}`,
        );
        const dropdown = await this.getElement(locator);
        dropdown.findElements(By.tagName("option")).then(async (options) => {
            for (const option of options) {
                const isSelected = await option.isSelected();
                if (isSelected) {
                    await option.click();
                }
            }
        });

        return "pending";
    }

    /**
     * Checks a checkbox
     * @param locator - By locator of the checkbox
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async checkCheckbox(locator: By): Promise<string> {
        this.debugLog(this.world, `checking checkbox ${locator}`);
        const checkbox = await this.getElement(locator);
        if (!(await checkbox.isSelected())) {
            await checkbox.click();
        }
        return "pending";
    }

    /**
     * Unchecks a checkbox
     * @param locator - By locator of the checkbox
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async uncheckCheckbox(locator: By): Promise<string> {
        this.debugLog(this.world, `unchecking checkbox ${locator}`);
        const checkbox = await this.getElement(locator);
        if (await checkbox.isSelected()) {
            await checkbox.click();
        }
        return "pending";
    }

    /**
     * Selects a radio button
     * @param locator - By locator of the radio button
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async selectRadioButton(locator: By): Promise<string> {
        this.debugLog(this.world, `select Radio button ${locator}`);
        const radioButton = await this.getElement(locator);
        if (!(await radioButton.isSelected())) {
            await radioButton.click();
        }
        return "pending";
    }

    /**
     * Unselects a radio button
     * @param locator - By locator of the radio button
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async unselectRadioButton(locator: By): Promise<string> {
        this.debugLog(this.world, `unselect Radio button ${locator}`);
        const radioButton = await this.getElement(locator);
        if (await radioButton.isSelected()) {
            await radioButton.click();
        }
        return "pending";
    }

    /**
     * Selects an option from a radio button group
     * @param locator - By locator of the radio button group
     * @param option - Value of the option to select
     * @returns Promise<string> - "pending" (unimplemented)
     */
    protected async selectOptionFromRadioButtonGroup(
        locator: By,
        option: string,
    ): Promise<string> {
        this.debugLog(
            this.world,
            `select Radio button ${locator} option ${option}`,
        );
        const radioButtonGroup = await this.getElement(locator);
        radioButtonGroup.findElements(By.tagName("input")).then(async (options) => {
            for (const opt of options) {
                const value = await opt.getAttribute("value");
                if (value === option) {
                    await opt.click();
                }
            }
        });
        return "pending";
    }

    /**
     * Sends the backspace key to an element
     * @param locator - By locator of the element
     * @returns Promise<void>
     */
    protected async backspace(locator: By): Promise<void> {
        try {
            await this.waitForElementToBeLocated(locator, 6);
            this.debugLog(this.world, `sending backspace to ${locator}`);
            await (await this.getElement(locator)).sendKeys(Key.BACK_SPACE);
        } catch (error) {
            error.message = error.message + ` could not send backspace to ${locator}`;
            throw error;
        }
    }

    /**
     * Sends the enter key to an element
     * @param locator - By locator of the element
     * @returns Promise<void>
     */
    protected async enter(locator: By): Promise<void> {
        try {
            await this.waitForElementToBeLocated(locator, 6);
            this.debugLog(this.world, `sending enter to ${locator}`);
            await (await this.getElement(locator)).sendKeys(Key.ENTER);
        } catch (error) {
            error.message = error.message + ` could not send enter to ${locator}`;
            throw error;
        }
    }

    /**
     * Sends the tab key to the currently focused element
     * @returns Promise<void>
     */
    protected async tab(): Promise<void> {
        try {
            this.debugLog(this.world, `sending tab to the currently focused element`);
            await this.driver
                .actions({ async: false, bridge: true })
                .sendKeys(Key.TAB)
                .perform();
        } catch (error) {
            error.message =
                error.message + ` could not send tab to the currently focused element`;
            throw error;
        }
    }

    /** Returns the current URL
     * 
     * @returns Promise<string>
     */
    protected async getUrl(): Promise<string> {
        return await this.driver.getCurrentUrl();
    }

    /**
     * Navigates to a URL
     * @param url - URL to navigate to
     * @returns Promise<void>
     */
    protected async navigateTo(url: string): Promise<void> {
        this.debugLog(this.world, `attempting to open ${url}`);
        await this.driver.get(url);
    }

    /**
     * Navigates directionally (back or forward)
     * @param direction - Direction to navigate ("back" or "forward")
     * @returns Promise<void>
     */
    protected async navigatePage(direction: "back" | "forward"): Promise<void> {
        if (direction === "back") {
            this.debugLog(this.world, "pressing back button");
            await this.driver.navigate().back();
        } else {
            this.debugLog(this.world, "pressing forward button");
            await this.driver.navigate().forward();
        }
    }

    /**
     * Shuts down the driver
     * @returns Promise<void>
     */
    protected async closeDriver(): Promise<void> {
        this.debugLog(this.world, "shutting down");
        await this.driver.quit();
    }

    /**
     * Refreshes the page
     * @returns Promise<void>
     */
    protected async refreshPage(): Promise<void> {
        this.debugLog(this.world, "refresh");
        await this.driver.navigate().refresh();
    }

    /**
     * Gets the system modifier key (control or command)
     * @returns Promise<string> - "control" for Windows/Linux, "command" for macOS
     */
    protected async getSystemModifierKey(): Promise<string> {
        const os = (await this.driver.getCapabilities())
            .getPlatform()
            .toUpperCase();
        if (os === "WINDOWS" || os === "LINUX") {
            return "control";
        } else if (os === "DARWIN") {
            return "command";
        } else {
            throw new Error(`failed to get system modifier key. unknown OS ${os}`);
        }
    }

    /**
     * Hovers over an element by locator
     * @param locator - By locator of the element
     * @returns Promise<void>
     */
    protected async hoverOverElement(locator: By): Promise<void> {
        try {
            await this.waitForElementToBeLocated(locator, 6);
            this.debugLog(this.world, `hovering over ${locator}`);
            const element = await this.getElement(locator);
            await this.driver.actions().move({ origin: element }).perform();
        } catch (error) {
            error.message = error.message + ` Failed to hover over element ${locator}`;
            throw error;
        }
    }

    /**
     * Sets the window size
     * @param width - Window width in pixels
     * @param height - Window height in pixels
     * @returns Promise<void>
     */
    protected async setWindowSize(width: number, height: number): Promise<void> {
        await this.driver
            .manage()
            .window()
            .setRect({ x: 0, y: 0, width: width, height: height });
    }

    /**
     * Maximizes the browser window
     * @returns Promise<void>
     */
    protected async maximizeWindow(): Promise<void> {
        await this.driver.manage().window().maximize();
    }

    /**
     * Performs drag and drop between two elements (Firefox-compatible)
     * @param sourceLocator - By locator of the element to drag
     * @param targetLocator - By locator of the drop target element
     * @returns Promise<void>
     */
    protected async dragAndDrop(
        sourceLocator: By,
        targetLocator: By,
    ): Promise<void> {
        this.debugLog(
            this.world,
            `dragging ${sourceLocator} to ${targetLocator}`,
        );

        const sourceElement = await this.getElement(sourceLocator);
        const targetElement = await this.getElement(targetLocator);

        // Use JavaScript-based drag and drop for Firefox compatibility
        const script = `
      function simulateDragDrop(sourceNode, destinationNode) {
        var EVENT_TYPES = {
          DRAG_END: 'dragend',
          DRAG_START: 'dragstart',
          DROP: 'drop'
        }

        function createCustomEvent(type) {
          var event = new CustomEvent('CustomEvent')
          event.initCustomEvent(type, true, true, null)
          event.dataTransfer = {
            data: {},
            setData: function(type, val) {
              this.data[type] = val
            },
            getData: function(type) {
              return this.data[type]
            }
          }
          return event
        }

        function dispatchEvent(node, type, event) {
          if (node.dispatchEvent) {
            return node.dispatchEvent(event)
          }
          if (node.fireEvent) {
            return node.fireEvent('on' + type, event)
          }
        }

        var event = createCustomEvent(EVENT_TYPES.DRAG_START)
        dispatchEvent(sourceNode, EVENT_TYPES.DRAG_START, event)

        var dropEvent = createCustomEvent(EVENT_TYPES.DROP)
        dropEvent.dataTransfer = event.dataTransfer
        dispatchEvent(destinationNode, EVENT_TYPES.DROP, dropEvent)

        var dragEndEvent = createCustomEvent(EVENT_TYPES.DRAG_END)
        dragEndEvent.dataTransfer = event.dataTransfer
        dispatchEvent(sourceNode, EVENT_TYPES.DRAG_END, dragEndEvent)
      }

      simulateDragDrop(arguments[0], arguments[1]);
    `;

        await this.driver.executeScript(script, sourceElement, targetElement);
    }
    /**
     * Description: checks the element displayed status and returns true/false.  Throws an
     * error if it finds more than one of the same element.
     *
     * @export
     * @async
     * @param {By} locator
     * @returns boolean
     */
    protected async isElementDisplayed(
        locator: By,
    ) {
        this.debugLog(this.world, `checking element displayed status ${locator}`);
        try {
            await this.waitForElementToBeLocated(locator, 3);
        } catch (err) {
            this.debugLog(this.world, `element ${locator} not found`);
            return false;
        }

        let element = await this.getElement(locator);
        return element.isDisplayed();
    }
    /**
     * Description: checks the element its presence in the DOM and returns true/false.
     *
     * @export
     * @async
     * @param {By} locator
     * @returns boolean
     */
    protected async isElementInDOM(locator: By) {
        this.debugLog(this.world, `checking if element is in DOM ${locator}`);
        let elements = await this.getElements(locator);
        return elements.length !== 0;
    }
    /**
     * Description: returns the alert
     *
     * @returns Promise<Alert>
     */
    protected async getAlert() {
        return await this.driver.switchTo().alert();
    }

    /**
     * Description: Changes the focus of all future commands to another frame on the page.
     *
     * @returns Promise<void>
     */
    protected async switchToFrame(locator: By) {
        await this.driver.switchTo().frame(await this.getElement(locator));
    }

    /**
     * Description: Switches focus of all future commands to the topmost frame in the current window.
     *
     * @returns Promise<void>
     */
    protected async switchToDefaultContent() {
        await this.driver.switchTo().defaultContent();
    }

    /**
     * Description: Get the image it's visibility status
     * 
     * @param webElement - WebElement of the image
     * @returns Promise<boolean> - true if image is visible, false otherwise
     */
    protected async isImageVisible(webElement: WebElement): Promise<boolean> {
        const isDisplayed = await webElement.isDisplayed();
        if (!isDisplayed) {
            return false;
        }
        // The following to make sure it is a valid image and loaded in correctly:
        const isVisible: boolean = await this.driver.executeScript("return (typeof arguments[0].naturalWidth !=\"undefined\" && arguments[0].naturalWidth > 0);", webElement);
        return isVisible;
    }

    // TODO: This method currently works only with Chromium (Selenium limitation). Extend support to other browsers as needed.
    /**
     * Description: Captures network request and response when clicking an element.
     * 
     * @param locator - By locator of the element to click
     * @param urlFilter - String to match in the URL to capture the specific request
     * @returns Promise<{ url: string, statusCode: number } | null>
     */
    protected async getClickRequestResponse(locator: By, urlFilter: string): Promise<{ url: string, statusCode: number } | null> {
        try {
            const driver = this.driver as any;
            
            // Enable network tracking
            await driver.sendDevToolsCommand('Network.enable', {});

            let capturedResponse: { url: string, statusCode: number } | null = null;

            // Set up CDP event listener using the executor's command
            const connection = await driver.createCDPConnection('page');
            
            connection.on('Network.responseReceived', (params: any) => {
                if (params.response.url.includes(urlFilter)) {
                    capturedResponse = {
                        url: params.response.url,
                        statusCode: params.response.status
                    };
                }
            });

            // Perform the click
            await this.click(locator);

            // Wait for response to be captured
            await this.wait(3);

            // Disable network tracking
            await driver.sendDevToolsCommand('Network.disable', {});

            this.debugLog(this.world, `Captured response: ${JSON.stringify(capturedResponse)}`);
            return capturedResponse;
        } catch (error) {
            this.debugLog(this.world, `CDP error: ${error.message} - falling back to regular click`);
            await this.click(locator);
            return null;
        }
    }
}