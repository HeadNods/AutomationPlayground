import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { World } from "../../support/driverController";

export class GeoLocationPage extends BasePage {
    //Locators
    private readonly header = By.css("div.example h3");
    private readonly getLocationButton = By.xpath("//button[@onclick='getLocation()']");
    private readonly demoDisplay = By.id("demo");
    private readonly latitudeDisplay = By.id("lat-value");
    private readonly longitudeDisplay = By.id("long-value");
    private readonly mapLink = By.css("#map-link > a");
    //Constructor
    constructor(world: World) {
        super(world);
    }
    //Page URL
    readonly url = "https://the-internet.herokuapp.com/geolocation"
    //Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
        //Simulate geolocation to custom coordinates and without enabling browser permissions
        await this.driver.executeScript(
            `window.navigator.geolocation.getCurrentPosition = function(success) {
                var position = {
                    "coords": {
                        "latitude": "555",
                        "longitude": "999"
                    }
                };
                success(position);
            }`
        );
    }
    async clickGetLocationButton(): Promise<void> {
        await this.click(this.getLocationButton);
    }
    //Getters
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }
    async getGetLocationButtonText(): Promise<string> {
        return await this.getElementText(this.getLocationButton);
    }
    async getDemoText(): Promise<string> {
        return await this.getElementText(this.demoDisplay);
    }
    async getLatitudeText(): Promise<string> {
        return await this.getElementText(this.latitudeDisplay);
    }
    async getLongitudeText(): Promise<string> {
        return await this.getElementText(this.longitudeDisplay);
    }
    async getMapLinkHref(): Promise<string> {
        return await this.getElementAttribute(this.mapLink, "href");
    }
    async getMapLinkText(): Promise<string> {
        return await this.getElementText(this.mapLink);
    }
}