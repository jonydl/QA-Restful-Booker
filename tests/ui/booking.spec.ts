// Core tests:
// 1. Full booking flow (single, double and suite rooms)
//  - Assert the success booking message
// 2. Negative booking flows:
//  - Cancelling the booking during the booking process
//  - Asset the user is booking form returns to the room calendar view
// 3. Change booking dates in the booking page and proceed with the booking
//  - Room price recalculates when dates are changed

// Edge cases:
// 1. Dates for the room are older than the current date
//  - Assert the booking is not possible
// 2. Today's date is automatically highlighted
// 3. A single date can not be selected in the booking calendar
//  - Assert the booking for a single date is not possible

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Booking room flows', () => {

    let homePage : HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToHomePage();
    });


    test('should book a room and assert success message', async ({ page } ) => {
        const firstName : string = 'John';
        const lastName : string = 'Doe';
        const email : string = 'jdoe@hotmail.com';
        const phone : string = '07030245655';
        
        await page.getByRole('link', { name: 'Book Now', exact: true }).click();

  
        // Check in/out dates
        await page.getByPlaceholder('Check-in date').click();
        await page.getByRole('gridcell', { name: 'Choose Tuesday, 26 May' }).click();

        await page.getByPlaceholder('Check-out date').click();
        await page.getByRole('gridcell', { name: 'Choose Sunday, 31 May' }).click();
        await page.getByRole('button', { name: 'Check Availability' }).click();

        // Select a room
        await page.getByRole('link', { name: 'Book now' }).nth(1).click();
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Fill the booking form
        await page.getByRole('textbox', { name: 'Firstname' }).fill(firstName);
        await page.getByRole('textbox', { name: 'Lastname' }).fill(lastName);
        await page.getByRole('textbox', { name: 'Email' }).fill(email);
        await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Assert success message
        await expect(page.getByRole('heading', { name: /booking confirmed/ })).toBeVisible();
    });
});

