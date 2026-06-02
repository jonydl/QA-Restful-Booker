import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

let homePage : HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoadedPage();
});

test.describe('Booking flows', () => {

    test('should book a single room with preselected dates', async ({ page }) => {

        // Asset the room card is visible and press book now button
        await expect(page.locator('div').filter({ hasText: 'SingleAenean porttitor mauris' }).nth(4)).toBeVisible();
        await page.getByRole('link', { name: 'Book now' }).nth(1).click();

        // Assert Single room page, submit booking dates
        await homePage.bookRoomWithDates(1, '2026-06-19', '2026-06-21');
        await expect(page.url()).toContain('/reservation/');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Fill booking form and submit
        await page.getByRole('textbox', { name: 'Firstname' }).fill('John');
        await page.getByRole('textbox', { name: 'Lastname' }).fill('Doe');
        await page.getByRole('textbox', { name: 'Email' }).fill('jd.test@testemail.com');
        await page.getByRole('textbox', { name: 'Phone' }).fill('784022345989');
        await page.getByRole('button', { name: 'Reserve Now' }).click();

        // Assert booking confirmation element to show
        await expect(await page.getByText('Booking ConfirmedYour booking')).toBeVisible({ timeout: 5000 });
    });

    // User Journeys P0
        // Book a single room given the range
        //     - Assert = Booking confirmation
        // Book a double room given the range
        //     - Assert = Booking confirmation
        // Book a suite room given the range
        //     - Assert = Booking confirmation


        // Book a single room without dates preselected
        //     - Assert = Booking confirmation
        // Book a double room without dates preselected
        //     - Assert = Booking confirmation
        // Book a suite room without dates preselected
        //     - Assert = Booking confirmation
});