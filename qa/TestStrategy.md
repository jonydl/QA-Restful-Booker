# UI/End-To-End
    Purpose: validate the real user flows through the application

## P0 - Book a single/double/suite room for a range of dates - @
1. Open homepage
2. Select Check-in 
3. Select Check-out dates
4. Verify rooms list is visible
5. Select an avalable room
6. Click on 'Book Now'
7. Fill the form (name, email, phone, etc)
8. Click on 'Reserve Now'
9. Assert booking summary message is visible

## P0 - Book a single/double/suite room without pre-selected dates
1. Open homepage
2. Click on 'Book Now' under the Rooms section
3. Insert the check-in and out dates
4. Click 'Reserve Now'
5. Fill the form (name, email, phone, etc)
6. Click on 'Reserve Now'
7. Assert booking summary message is visible

## P1 - Location and Contact information
1. Open homepage
2. Click on Location
3. Assert Address, Phone and Email are visible

## P1 - Contact Form Submission
1. Open homepage
2. Click on Contact
3. Fill the form
4. Submit
5. Assert success message is submitted

## P2 - Social Media Buttons
1. Open homepage
2. Click on Social Media
3. Assert that the buttons redirect to the respective social media pages

----------------------------------------------------------

# API
    Purpose: validate the business logic by checking backend rules independently of the UI

### P0 - Booking flows
GET /booking - return the IDs of all the bookings
    - Should return 200
    - Should return a list of booking IDs

GET /booking/{bookingId} - return a specific booking by ID
    - Should return 200 for valid ID
    - Shoul return 404 for invalid ID

POST /booking - create a new booking
    - Should return 201 for valid payload
    - Should return 400 for missing required fields
    - Should return 400 for invalid date range

PUT /booking/{bookingId} - update a specific booking by ID
    - Should fully update existing booking
    - Should return 404 for non-existent bookings

PATCH /booking/{bookingId} - updates a current booking with a partial payload
    - Should partially update existing booking

DELETE /booking/{bookingId} - delete a specific booking by ID (auth token required)
    - Should delete existing booking
    - Should return 200 or 201 on success
    - Should return 404/401 if unauthorized


----------------------------------------------------------

# Integration (UI + API)
    - Purpose: validade the UI and backend logic together. It validades if the UI booking confirmation is also returning valid values from the backend. 
    - Example: date is missing in the UI field, API returns a failure but UI shows the success booking message -> Bug

## P0 - Booking flow consistency
1. User completes the UI booking
2. Backend sends the POST /booking request
3. API returns 200 (sucess) or 201 (new resource has been created)
4. UI shows the success booking message
5. Validade booking details:
    - API booking exists via GET /booking/{bookingId}
    - UI data matches API response