import  { test, expect} from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test('Valid booking request @e2e', async ({ request }) => {
    // Create a new booking and assign to a const variable
    const response = await request.post(`${BASE_URL}/booking`, {
        data: {
            firstname: 'Hernando',
            lastname: 'Bolivar',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-08-01',
                checkout: '2026-08-08'
            },
            additionalneeds: 'Wifi'
        },
    });

    // Assert that the response status is 200 (OK)
    expect(response.status()).toBe(200);

    // Creates a new body constant variable and assigns the response body to it, parsing it as JSON data
    const body = await response.json();

    // Assert the received body has the expected properties of the new booking created
    // The bookingid property is expected to be present in the response body, 
    // and the booking object should have the same properties and values as the data sent in the request
    expect(body).toHaveProperty('bookingid');
    expect(body.booking.firstname).toBe('Hernando');
    expect(body.booking.lastname).toBe('Bolivar');
    expect(body.booking.totalprice).toBe(150);
    expect(body.booking.depositpaid).toBe(true);
    expect(body.booking.bookingdates.checkin).toBe('2026-08-01');
    expect(body.booking.bookingdates.checkout).toBe('2026-08-08');
    expect(body.booking.additionalneeds).toBe('Wifi');
    });

