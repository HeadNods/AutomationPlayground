import { Before, After, Status } from "@cucumber/cucumber";
import { World } from "./driverController";

Before(async function (this: World) {
  try {
    await this.init();
  } catch (error) {
    console.error("Failed to initialize driver:", error);
    throw error;
  }
});

After(async function (this: World, { result }) {
  try {
    // Only take screenshot if driver exists and test failed
    if (this.driver && result?.status === Status.FAILED) {
      try {
        const screenshot = await this.driver.takeScreenshot();
        await this.attach(Buffer.from(screenshot, 'base64'), "image/png");
      } catch (screenshotError) {
        console.error("Failed to take screenshot:", screenshotError);
      }
    }
  } finally {
    // Use the cleanup method which handles driver state tracking
    await this.cleanup();
  }
});