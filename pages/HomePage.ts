import { Page, expect } from "@playwright/test";

export class HomePage {
    protected readonly page: Page;

    constructor(page : Page){
        this.page = page;
    }

    //#region Home page navigation
    async goToHomePage(){
        await this.page.goto('https://automationintesting.online/');
    }
    async goToRoomsSection(){
        await this.page.locator('#navbarNav').getByRole('link', { name: 'Rooms' });
        await expect(this.page).toHaveURL('https://automationintesting.online/#rooms');
    }

    async goToBookingSection(){
        await this.page.locator('#navbarNav').getByRole('link', { name: 'Booking' });
        await expect(this.page).toHaveURL('https://automationintesting.online/#booking');
    }

    async goToAmenitiesSection(){
        await this.page.getByRole('link', { name: 'Amenities' });
        await expect(this.page).toHaveURL('https://automationintesting.online/#amenities');
    }

    async goToLocationSection(){
        await this.page.getByRole('link', { name: 'Location' });
        await expect(this.page).toHaveURL('https://automationintesting.online/#location');
    }

    async goToContactSection(){
        await this.page.locator('#navbarNav').getByRole('link', { name: 'Contact' });
        await expect(this.page).toHaveURL('https://automationintesting.online/#contact');
    }
    //#endregion
    
    //#region Home page calendar
    async selectCheckInDate(dayNumber: string, monthNumber: string, yearNumber: string){
        // Press the calendar check-in date field
        await this.page.getByRole('textbox').first().click();

        await this.page.getByRole('textbox').first().fill(`${dayNumber}/${monthNumber}/${yearNumber}`);
        await this.page.getByRole('textbox').first().press('Enter');
    }

    async selectCheckOutDate(date : string){
        return;
    }

    //#endregion

}