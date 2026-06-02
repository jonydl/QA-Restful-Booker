import { expect, Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;
    
    // URL pages
    readonly url = 'https://automationintesting.online/';
    readonly singleRoomURL = 'https://automationintesting.online/reservation/1';
    readonly doubleRoomURL = 'https://automationintesting.online/reservation/2';
    readonly suiteRoomURL = 'https://automationintesting.online/reservation/3';

    // Header buttons
    readonly roomsButton : Locator;
    readonly bookingButton : Locator;
    readonly locationButton : Locator;
    readonly amenitiesButton : Locator;
    readonly contactButton : Locator;
    readonly adminButton : Locator;

    // Home page buttons
    readonly bookNowButton : Locator;

    // Check-in/out form
    readonly checkInDateButton : Locator;
    readonly checkOutDateButton : Locator;
    readonly checkAvailabilityButton : Locator;
    readonly calendarContainer : Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Header buttons
        this.roomsButton = page.locator('#navbarNav').getByRole('link', { name: 'Rooms' });
        this.bookingButton = page.getByRole('link', { name: 'Booking' });
        this.amenitiesButton = page.getByRole('link', { name: 'Amenities' });
        this.locationButton = page.getByRole('link', { name: 'Location' });
        this.contactButton = page.getByRole('link', { name: 'Contact' });
        this.adminButton = page.getByRole('link', { name: 'Admin', exact: true });

        // Home page
        this.bookNowButton = page.locator('section').filter({ hasText: 'Welcome to Shady Meadows B&' }).getByRole('link', { name: 'Book Now', exact: true });

        // Check-in/out form
        this.checkInDateButton = page.locator('#booking').getByRole('textbox').first();
        this.checkOutDateButton = page.locator('#booking').getByRole('textbox').nth(1);
        this.checkAvailabilityButton = page.locator('#booking').getByRole('button', { name: 'Check Availability' });
        this.calendarContainer = page.getByRole('dialog', { name: 'Choose Date' });

    }

    async goto() {
        await this.page.goto(this.url);
    }

    async expectLoadedPage(){
        await expect(this.page).toHaveURL(this.url);
    }
    
    // Format dates as YYYY-MM-DD (e.g., '2026-05-30')
    async bookRoomWithDates(roomId: number, checkInDate: string, checkOutDate: string) {
        const roomUrl : string = `/reservation/${roomId}?checkin=${checkInDate}&checkout=${checkOutDate}`;
        await this.page.goto(roomUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async bookRoomFromHome(roomNumber: number, checkInDate: string, checkOutDate: string) {
        await this.goto();
        await this.bookRoomWithDates(roomNumber, checkInDate, checkOutDate);
    }

    // This interacts with the actual date buttons in the calendar
    async selectDatesInCalendar(checkInDate: string, checkOutDate: string) {
        // Click check-in date button to open calendar
        await this.checkInDateButton.click();
        await this.page.waitForTimeout(300);
        
        // Extract day from date string (format: "2026-05-30" -> "30")
        const checkInDay = checkInDate.split('-')[2];
        const checkOutDay = checkOutDate.split('-')[2];
        
        await this.page.locator('.rbc-date-cell').getByRole('button', { name: checkInDay }).first().click();
        await this.page.locator('.rbc-date-cell').getByRole('button', { name: checkOutDay }).first().click();
        await this.checkAvailabilityButton.click();
    }
}