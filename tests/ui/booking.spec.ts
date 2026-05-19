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


    test('should book a single room', async ({ page }) => {
        await homePage.goToBookingSection();
        await homePage.selectCheckInDate( '01', '09', '2026' );
    });

    
});
