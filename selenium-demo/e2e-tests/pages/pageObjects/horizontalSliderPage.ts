import { By, Key } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { World } from "../../support/driverController";

export class HorizontalSliderPage extends BasePage {
    //Locators
    private readonly header = By.css("div.example h3");
    private readonly subheader = By.css("div.example h4");
    private readonly slider = By.css("input[type='range']");
    private readonly rangeDisplay = By.id("range");
    //Constructor
    constructor(world: World) {
        super(world);
    }
    //Page URL
    readonly url = "https://the-internet.herokuapp.com/horizontal_slider"
    //Actions
    async navigate(): Promise<void> {
        await this.driver.get(this.url);
    }
    async setSliderValue(value: string): Promise<void> {
        const targetValue = parseFloat(value);
        const sliderElement = await this.getElement(this.slider);
        
        // Click on slider to focus it
        await sliderElement.click();
        
        // Get current value
        let currentValue = parseFloat(await sliderElement.getAttribute("value"));
        
        // Calculate steps needed (each step is 0.5)
        const difference = targetValue - currentValue;
        const steps = Math.round(difference / 0.5);
        
        // Press arrow keys to reach target value
        const key = steps > 0 ? Key.ARROW_RIGHT : Key.ARROW_LEFT;
        const absSteps = Math.abs(steps);
        
        for (let i = 0; i < absSteps; i++) {
            await sliderElement.sendKeys(key);
        }
    }
    //Getters
    async getHeaderText(): Promise<string> {
        return await this.getElementText(this.header);
    }
    async getSubheaderText(): Promise<string> {
        return await this.getElementText(this.subheader);
    }
    async getRangeValue(): Promise<string> {
        return await this.getElementText(this.rangeDisplay);
    }
    async getSliderMinValue(): Promise<string> {
        return await this.getElementAttribute(this.slider, "min");
    }
    async getSliderMaxValue(): Promise<string> {
        return await this.getElementAttribute(this.slider, "max");
    }
    async getSliderStepValue(): Promise<string> {
        return await this.getElementAttribute(this.slider, "step");
    }
    async getSliderCurrentValue(): Promise<string> {
        return await this.getElementAttribute(this.slider, "value");
    }
}
