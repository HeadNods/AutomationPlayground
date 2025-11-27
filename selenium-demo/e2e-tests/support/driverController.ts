import { config } from "dotenv";
config(); // Load .env file

import { World as CucumberWorld, setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";
import edge from "selenium-webdriver/edge";

// Use type imports to avoid loading page classes at runtime
import type { HomePage } from "../pages/pageObjects/homePage";
import type { AddRemoveElementsPage } from "../pages/pageObjects/addRemoveElementsPage";
import type { CheckboxesPage } from "../pages/pageObjects/checkboxesPage";
import type { ContextMenuPage } from "../pages/pageObjects/contextMenuPage";
import type { DragAndDropPage } from "../pages/pageObjects/dragAndDropPage";
import type { DynamicControlsPage } from "../pages/pageObjects/dynamicControlsPage";
import type { InputsPage } from "../pages/pageObjects/inputsPage";
import type { JavascriptAlertsComponent } from "../pages/components/javascriptAlertsComponent";
import type { LoginPage } from "../pages/pageObjects/loginPage";
import type { BrokenImagesPage } from "../pages/pageObjects/brokenImagesPage";

interface BrowserConfig {
    browser: string;
    options: chrome.Options | firefox.Options | edge.Options;
}

function getBrowserOptions(browser: string): BrowserConfig {
    const chromiumArgs = [
        "--ignore-certificate-errors",
        "--allow-running-insecure-content",
        "--disable-extensions",
        "--start-maximized",
        "--headless",
        "--no-sandbox",
        "--disable-dev-shm-usage"
    ];

    switch (browser.toLowerCase()) {
        case "firefox":
            const firefoxOptions = new firefox.Options();
            firefoxOptions.addArguments("--headless");
            firefoxOptions.windowSize({ width: 1920, height: 1080 });
            return { browser: "firefox", options: firefoxOptions };
        
        case "edge":
        case "msedge":
            const edgeOptions = new edge.Options();
            chromiumArgs.forEach(arg => edgeOptions.addArguments(arg));
            return { browser: "MicrosoftEdge", options: edgeOptions };
        
        case "chrome":
        case "chrome-for-testing":
        default:
            const chromeOptions = new chrome.Options();
            chromiumArgs.forEach(arg => chromeOptions.addArguments(arg));
            return { browser: "chrome", options: chromeOptions };
    }
}

export class World extends CucumberWorld {
    debugLog: string = "";
    parameters: any;
    public driver!: WebDriver;
    private driverInitialized: boolean = false;
    
    // Page Object instances - initialized on-demand in step definitions
    homePage: HomePage;
    addRemoveElementsPage: AddRemoveElementsPage;
    checkboxesPage: CheckboxesPage;
    contextMenuPage: ContextMenuPage;
    dragAndDropPage: DragAndDropPage;
    dynamicControlsPage: DynamicControlsPage;
    inputsPage: InputsPage;
    javascriptAlertsComponent: JavascriptAlertsComponent;
    loginPage: LoginPage;
    brokenImagesPage: BrokenImagesPage;

    constructor(options: any) {
        super(options);
    }

    async init() {
        const seleniumGrid = process.env.SELENIUM_GRID;
        if (!seleniumGrid) {
            throw new Error("SELENIUM_GRID environment variable is not set. Please check your .env file.");
        }

        const browser = process.env.BROWSER || "chrome";
        const { browser: browserName, options } = getBrowserOptions(browser);
        
        console.log(`Connecting to Selenium Grid at: ${seleniumGrid}`);
        console.log(`Using browser: ${browser}`);
        
        try {
            const builder = new Builder()
                .forBrowser(browserName)
                .usingServer(seleniumGrid);

            // Set browser-specific options
            if (options instanceof chrome.Options) {
                builder.setChromeOptions(options);
            } else if (options instanceof firefox.Options) {
                builder.setFirefoxOptions(options);
            } else if (options instanceof edge.Options) {
                builder.setEdgeOptions(options);
            }

            this.driver = await builder.build();
            this.driverInitialized = true;
            console.log("Driver initialized successfully");
        } catch (error) {
            console.error("Failed to initialize WebDriver:", error);
            throw error;
        }
    }

    async cleanup(): Promise<void> {
        if (this.driverInitialized && this.driver) {
            try {
                await this.driver.quit();
                console.log("Driver cleanup completed");
            } catch (error) {
                console.error("Error during driver cleanup:", error);
            } finally {
                this.driverInitialized = false;
            }
        }
    }
}

setWorldConstructor(World);

// Set default timeout to 15 minutes for long-running scenarios
// (e.g., waiting for elements, network requests, browser startup)
setDefaultTimeout(15 * 60 * 1000);