import { Page, expect } from "@playwright/test";

export class HomePage {
    protected readonly page: Page;

    constructor(page : Page){
        this.page = page;
    }

    async goToHomePage(){
        await this.page.goto('https://automationintesting.online');
    }

    async pressBookNowButton(){{
        return this.page.getByRole('link', { name: 'Book Now' }).click();
    }} 

    async checkInInputField(){
        await this.page.getByRole('textbox').first().click();
    }

    // Calendar Input Methods
    async calendarCheckInDateInput(dayName : string, dateNumber : string, monthName : string){
        const formatedDate = `Choose ${dayName}, ${dateNumber} ${monthName}`;
        await this.page.getByRole('gridcell', { name: formatedDate }).click();
    }
}