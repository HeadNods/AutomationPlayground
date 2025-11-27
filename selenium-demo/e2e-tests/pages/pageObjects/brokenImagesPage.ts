import { By } from "selenium-webdriver";
import { BasePage } from "../basePage";
import { World } from "../../support/driverController";

export class BrokenImagesPage extends BasePage {
    //Locators
    private readonly header = By.css("div.example h3");
    private readonly allImages = By.css("div.example img");
    //Constructor
    constructor(world: World) {
        super(world);
    }
    //Page URL
    readonly url = "http://the-internet.herokuapp.com/broken_images"
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
    async getNumberOfImages(): Promise<number> {
        return await this.getElementsCount(this.allImages);
    }
    async getImageSources(): Promise<string[]> {
        const images = await this.getElements(this.allImages);
        let srcList: string[] = [];
        for (const image of images) {
            const src = await image.getAttribute("src");
            srcList.push(src);
        }
        return srcList;
    }
    async getImagesVisibility(): Promise<boolean[]> {
        const images = await this.getElements(this.allImages);
        let visibilityList: boolean[] = [];
        for (const image of images) {
            const imagePresent: boolean = await this.isImageVisible(image);
            visibilityList.push(imagePresent);
        }
        return visibilityList;
    }
}