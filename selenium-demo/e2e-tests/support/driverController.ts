import { config } from "dotenv";
config(); // Load .env file

import { World as CucumberWorld, setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber";
import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";
import edge from "selenium-webdriver/edge";

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
        console.log("Driver initialized successfully");
    }
}

setWorldConstructor(World);
setDefaultTimeout(15 * 60 * 1000);