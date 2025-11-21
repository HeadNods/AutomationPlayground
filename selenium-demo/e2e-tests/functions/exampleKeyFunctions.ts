import { Key } from "selenium-webdriver";
import { World } from "../support/driverController";
import { SelectorType, isSelectorType, waitForElementToBeLocated, createLogger, elementLocator } from "./base";
let debugLog = createLogger("keys");

/**
 * Description: Sends the backspace key to an element
 * @date 12/29/2022 - 12:04:37 PM
 *
 * @param {World} self - Cucumber World object
 * @param {string} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @returns Promise<void>
 */
export async function backspace(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
) {
  if (!isSelectorType(elementType))
    throw new Error("elementType is not a valid selector type");

  try {
    await waitForElementToBeLocated(self, elementType, typeValue, 6);
    debugLog(self, `sending backspace to ${elementType} ${typeValue}`);
    await self.driver
      .findElement(elementLocator(elementType, typeValue))
      .sendKeys(Key.BACK_SPACE);
  } catch (error) {
    error.message =
      error.message +
      `could not sending backspace to ${elementType} ${typeValue}`;
    throw error;
  }
}

/**
 * Description: Sends the enter key to an element
 * @date 12/29/2022 - 12:04:37 PM
 *
 * @param {World} self - Cucumber World object
 * @param {string|SelectorType} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @returns Promise<void>
 */
export async function enter(
  self: World,
  elementType: string | SelectorType,
  typeValue: string,
) {
  if (!isSelectorType(elementType))
    throw new Error("elementType is not a valid selector type");

  try {
    await waitForElementToBeLocated(self, elementType, typeValue, 6);
    debugLog(self, `sending enter to ${elementType} ${typeValue}`);
    await self.driver
      .findElement(elementLocator(elementType, typeValue))
      .sendKeys(Key.ENTER);
  } catch (error) {
    error.message = error.message`could not sending backspace to ${elementType} ${typeValue}`;
    throw error;
  }
}


/**
 * Description: Sends the enter key to an element
 * @date 12/29/2022 - 12:04:37 PM
 *
 * @param {World} self - Cucumber World object
 * @param {string|SelectorType} elementType - element type (id, name, xpath, etc)
 * @param {string} typeValue - value of the element type
 * @returns Promise<void>
 */
export async function tab(
  self: World
) {
  try {
    debugLog(self, `sending tab to the currently focused element`);
    self.driver.actions({ async: false, bridge: true })
      .sendKeys(Key.TAB);
  } catch (error) {
    error.message = error.message + ` could not send tab to the currently focused element`;
    throw error;
  }
}
