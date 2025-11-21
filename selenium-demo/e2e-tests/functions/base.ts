import { By } from "selenium-webdriver";
import { World } from "../support/driverController";
import { until, WebElement } from "selenium-webdriver";
import debug from "debug";

export type Logger = (self: World, message: string) => void;
export const createLogger = (namespace: string): Logger => {
  const debugLog = debug(namespace);

  return (self: World, message: string) => {
    debugLog(message);
    self.debugLog = `${self.debugLog}\n${namespace} ${message}`;
  };
};
let debugLog = createLogger("elements");

var elements = "element|button|link|menu item|selection|input";
var elementIdentifiers = "id|name|class|xpath|css";

export function validateElement(element: string) {
  if (elements.includes(element)) {
    return true;
  } else {
    return false;
  }
}

export function validateLocater(locator: string) {
  if (elementIdentifiers.includes(locator)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Selector types for scanning the DOM
 * @date 5/19/2023 - 12:36:49 PM
 *
 * @export
 * @typedef {SelectorType}
 */
export type SelectorType =
  | "id" // Matches by element ID
  | "name" // Matches by element name
  | "xpath" // Matches using an XPath expression
  | "css" // Matches using a CSS selector
  | "class"; // Matches by class name

export function isSelectorType(locator: string): locator is SelectorType {
  return ["id", "class", "css", "name", "xpath"].includes(locator);
}

/**
 * Description: This function returns the locator for the element
 * @date 12/29/2022 - 12:06:10 PM
 *
 * @param {string} elementType - element type (id, name, xpath, class, css, etc)
 * @param {string} typeValue - value of the element type
 * @returns By
 */
export function elementLocator(elementType: string, typeValue: string) {
  let retValue = null;
  switch (elementType) {
    case "id":
      retValue = By.id(typeValue);
      break;
    case "name":
      retValue = By.name(typeValue);
      break;
    case "class":
      retValue = By.className(typeValue);
      break;
    case "xpath":
      retValue = By.xpath(typeValue);
      break;
    case "css":
      retValue = By.css(typeValue);
      break;
    default:
      throw new Error(`Invalid element type: ${elementType}`);
  }
  return retValue;
}

/**
 * Description: This function returns the attribute for the element
 * @date 12/29/2022 - 1:39:35 PM
 *
 * @export
 * @async
 * @param {World} self
 * @param {string} elementType
 * @param {string} typeValue
 * @param {string} hasType
 * @returns Promise<string>
 */
export async function getElementAttribute(
  self: World,
  elementType: string,
  typeValue: string,
  attribute: string,
) {
  const element = await self.driver.findElement(
    elementLocator(elementType, typeValue),
  );
  const attributeValue = await element.getAttribute(attribute);
  debugLog(
    self,
    `Element ${elementType} ${typeValue} has attribute ${attribute} with value of ${attributeValue}`,
  );

  return attributeValue;
}

/**
 * Description: Gets the text of an element
 * @date 12/29/2022 - 1:05:51 PM
 *
 * @param {World} self
 * @param {string} elementType
 * @param {string} typeValue
 * @returns string
 */
export async function getElementText(
  self: World,
  elementType: string,
  typeValue: string,
) {
  await waitForElementToBeLocated(self, elementType, typeValue, 4);
  debugLog(self, `getting text of ${elementType} ${typeValue}`);
  return await self.driver
    .findElement(elementLocator(elementType, typeValue))
    .getText();
}

export async function wait(self: World, seconds: number) {
  debugLog(self, `waiting ${seconds}`);
  await self.driver.sleep(+seconds * 1000);
}

export async function waitForElementToDisplay(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  seconds: number,
) {
  const startTime = Date.now();
  debugLog(
    self,
    `waiting ${seconds} seconds for element ${elementType} ${typeValue} to display`,
  );
  await self.driver.wait(
    until.elementIsVisible(
      await self.driver.findElement(elementLocator(elementType, typeValue)),
    ),
    +seconds * 1000,
  );
  duration(self, "wait for element to display", startTime, seconds);
}

export async function waitForElementWithRetry(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  seconds: number,
  retries: number = 2,
) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      attempt++;
      debugLog(
        self,
        `Attempt ${attempt} to find element ${elementType} ${typeValue}`,
      );
      await waitForElementToDisplay(self, elementType, typeValue, seconds);
      debugLog(
        self,
        `Element ${elementType} ${typeValue} found on attempt ${attempt}`,
      );
      return;
    } catch (error) {
      debugLog(
        self,
        `Attempt ${attempt} failed: ${error}. Retrying (${attempt}/${retries})...`,
      );
      if (attempt >= retries) {
        throw new Error(
          `Failed to find element ${elementType} ${typeValue} after ${retries} attempts.`,
        );
      }
    }
  }
}

export async function waitForElementToBeLocated(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  seconds: number,
) {
  const secondsNum = parseInt(seconds.toString());
  const startTime = Date.now();

  debugLog(
    self,
    `waiting ${seconds} for element ${elementType} ${typeValue} to be located`,
  );
  await self.driver.wait(
    until.elementLocated(elementLocator(elementType, typeValue)),
    secondsNum * 1000,
  );

  duration(self, "wait for element to be located", startTime, secondsNum);
}

export async function waitForElementToBeClickable(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  seconds: number,
) {
  const startTime = Date.now();
  debugLog(
    self,
    `waiting ${seconds} for element ${elementType} ${typeValue} to be clickable`,
  );
  await waitForElementToBeLocated(self, elementType, typeValue, seconds);
  // sometimes you want to click on something that isn't visible yet ¯\_(ツ)_/¯
  //await waitForElementToDisplay(self, elementType, typeValue, seconds);

  duration(self, "wait for element to be clickable", startTime, seconds);
}

export async function waitForTitleToBe(
  self: World,
  titleMatch: string,
  seconds: number,
) {
  const startTime = Date.now();
  debugLog(self, `waiting ${seconds} for title to be ${titleMatch}`);
  await self.driver.wait(until.titleIs(titleMatch), +seconds * 1000);
  duration(self, "wait for title to be", startTime, seconds);
}

export async function getElementsCount(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
): Promise<number> {
  debugLog(self, `looking for ${elementType}: "${typeValue}"`);
  let elementCount = (
    await self.driver.findElements(elementLocator(elementType, typeValue))
  ).length;
  debugLog(self, `found ${elementCount} total`);
  return elementCount;
}

export function duration(
  self: World,
  message: string,
  startTime: number,
  waitTime: number,
) {
  const endTime = Date.now();
  const actualDurationMs = endTime - startTime;
  const actualDurationSec = (actualDurationMs / 1000).toFixed(2);

  debugLog(
    self,
    `${message} completed. Actual time taken: ${actualDurationSec} seconds. ` +
      `Configured wait time: ${waitTime} seconds.`,
  );
}


/**
 * Description: Clicks on an element
 * @date 12/29/2022 - 11:53:07 AM
 *
 * @param {World} self - Cucumber World object
 * @param {string} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @param {number|string} [waitSeconds=6] - time to wait for the element to be located
 * @returns <Promise<void>
 */
export async function click(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  waitSeconds: number | string = "6",
) {
  const waitSecondsNum = parseInt(waitSeconds.toString());
  const startTime = Date.now();

  debugLog(
    self,
    `clicking on ${elementType} ${typeValue} after waiting up to ${waitSeconds} seconds for it to be clickable`,
  );
  await waitForElementToBeClickable(
    self,
    elementType,
    typeValue,
    waitSecondsNum,
  );

  try {
    // give a little time for the element to be located in case animations or other things are happening
    await self.driver
      .findElement(elementLocator(elementType, typeValue))
      .click();
  } catch (error) {
    error.message =
      error.message + `could not click on ${elementType} ${typeValue}`;
    throw error;
  }

  duration(self, "click", startTime, waitSecondsNum);
}

/**
 * Description: Clicks on an element if it exists within the given time. Don't error if it doesn't exist.
 * @date 12/29/2022 - 2:40:05 PM
 *
 * @export
 * @async
 * @param {World} self - Cucumber World object
 * @param {string|SelectorType} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @param {number|string} [waitSeconds="6"] - number of seconds to wait for the element to be located
 * @returns Promise<void>
 */
export async function clickIfExists(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  waitSeconds: number | string = "6",
) {
  const startTime = Date.now();
  try {
    await waitForElementToBeClickable(
      self,
      elementType,
      typeValue,
      parseInt(waitSeconds.toString()),
    );

    debugLog(
      self,
      `looking for ${waitSeconds} seconds to click on ${elementType} ${typeValue}`,
    );
    await click(self, elementType as SelectorType, typeValue);
  } catch (error) {
    debugLog(self, `didn't find ${elementType} ${typeValue}`);
  }
  duration(self, "clickIfExists", startTime, parseInt(waitSeconds.toString()));
}

/**
 * Description: Double clicks on an element
 * @date 12/29/2022 - 11:54:12 AM
 *
 * @param {World} self - Cucumber World object
 * @param {string} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @param {number|string} [waitSeconds="6"] - number of seconds to wait for the element to be located
 * @returns <Promise<void>
 */
export async function doubleClick(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  waitSeconds: number | string = "6",
) {
  const startTime = Date.now();
  try {
    await waitForElementToBeClickable(
      self,
      elementType,
      typeValue,
      parseInt(waitSeconds.toString()),
    );

    debugLog(self, `doubleClicking on ${elementType} ${typeValue}`);
    let doubleClickElement = await self.driver.findElement(
      elementLocator(elementType, typeValue),
    );
    await self.driver.actions().doubleClick(doubleClickElement).perform();
  } catch (error) {
    error.message = error.message`could not doubleClick on ${elementType} ${typeValue}`;
    throw error;
  }
  duration(self, "doubleClick", startTime, parseInt(waitSeconds.toString()));
}

/**
 * Description: Right clicks on an element
 * @date 12/29/2022 - 11:54:51 AM
 *
 * @param {World} self - Cucumber World object
 * @param {string} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @param {number|string} [waitSeconds="6"] - number of seconds to wait for the element to be located
 * @returns <Promise<void>
 */
export async function rightClick(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  waitSeconds: number | string = "6",
) {
  const startTime = Date.now();
  try {
    await waitForElementToBeClickable(
      self,
      elementType,
      typeValue,
      parseInt(waitSeconds.toString()),
    );

    debugLog(self, `rightClicking on ${elementType} ${typeValue}`);
    let rightClickElement = await self.driver.findElement(
      elementLocator(elementType, typeValue),
    );
    await self.driver.actions().contextClick(rightClickElement).perform();
  } catch (error) {
    error.message =
      error.message + `could not rightClick on ${elementType} ${typeValue}`;
    throw error;
  }
  duration(self, "rightClick", startTime, parseInt(waitSeconds.toString()));
}

/**
 * Description: Clicks on an element forcefully
 * @date 12/29/2022 - 11:55:33 AM
 *
 * @param {World} self - Cucumber World object
 * @param {string|SelectorType} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @param {number|string} [waitSeconds="6"] - number of seconds to wait for the element to be located
 * @returns <Promise<void>
 */
export async function clickForcefully(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  waitSeconds: number | string = "6",
) {
  const startTime = Date.now();
  try {
    await waitForElementToBeClickable(
      self,
      elementType,
      typeValue,
      parseInt(waitSeconds.toString()),
    );

    debugLog(self, `clicking forcefully on ${elementType} ${typeValue}`);
    let forceClickElement = await self.driver.findElement(
      elementLocator(elementType, typeValue),
    );
    await self.driver.executeScript("arguments[0]click();", forceClickElement);
  } catch (error) {
    error.message =
      error.message +
      `could not click forcefully on ${elementType} ${typeValue}`;
    throw error;
  }
  duration(
    self,
    "clickForcefully",
    startTime,
    parseInt(waitSeconds.toString()),
  );
}

/**
 * Description: Clicks on an element using javascript
 * @date 12/29/2022 - 11:59:50 AM
 *
 * @param {World} self - Cucumber World object
 * @param {string|SelectorType} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @param {number|string} [waitSeconds="6"] - number of seconds to wait for the element to be located
 * @returns <Promise<void>
 */
export async function submit(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
  waitSeconds: number | string = "6",
) {
  const startTime = Date.now();
  try {
    await waitForElementToBeClickable(
      self,
      elementType,
      typeValue,
      parseInt(waitSeconds.toString()),
    );

    debugLog(self, `submitting ${elementType} ${typeValue}`);
    await self.driver
      .findElement(elementLocator(elementType, typeValue))
      .submit();
  } catch (error) {
    error.message =
      error.message + `could not submit ${elementType} ${typeValue}`;
    throw error;
  }
  duration(self, "submit", startTime, parseInt(waitSeconds.toString()));
}

export async function mouseOver(self: World, element: WebElement) {
  const actions = self.driver.actions({ async: false, bridge: true });
  await actions.move({ origin: element }).perform();
}

export async function mouseOverAndClick(self: World, element: WebElement) {
  const actions = self.driver.actions({ async: false, bridge: true });
  await actions.move({ origin: element }).click().perform();
}
