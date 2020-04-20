import $ from 'jquery';
import Booking from './booking';
import Hotel from './hotel';
import Manager from './manager';
import Room from './room';
import User from './user';

let domUpdates = {

  showManagementPage(user) {
    $('#login-page').removeClass('flex').addClass('hide');
    $('#manager-page').removeClass('hide').addClass('flex');
    $('#banner').text('Overlook Hotel Management')
  },

  showCustomerPage(name, id) {
    $('#login-page').removeClass('flex').addClass('hide');
    $('#manager-page').removeClass('flex').addClass('hide');
    $('#customer-page').removeClass('hide').addClass('flex');
    $(".welcome-user").html(`
      <div class="welcome-user">
      Welcome ${name}, UserID: <span id="cust-id">${id}</div>
      </div>`)
  },
  displayCustomerPastTrips(trips) {
    trips.forEach(trip => {
      $('#past-reservations-container').append(`
        <div class="trip-card">
          <div class="info-holder">
            <h3 class="trip-header">Past Trip for ${trip.date}</h3>
            <h4>Room Details:</h4>
            <section>
              <p>During your trip with us on ${trip.date}, you stayed in a
              ${trip.roomType} in room number ${trip.roomNumber} at a nightly
              rate of ${trip.costPerNight} USD. These rooms have ${trip.bedSize}-sized
              beds. Number of beds in your ${trip.roomType}: ${trip.numBeds}.
              We hope you enjoyed your stay at OVERLOOK.</p>
              <p>Confirmation code: ${trip.id}</p>
            </section>
          </div>
          <div class="image-holder">
            <img class="room-image" src="${trip.image}">
          </div>
        </div>`);
    })
  },
  displayCustomerUpcomingTrips(trips) {
    if (trips.length >= 1) {
      trips.forEach(trip => {
        $('#future-reservations-container').append(`
        <div class="trip-card">
          <div class="info-holder">
            <h3 class="trip-header">Upcoming Trip for ${trip.date}</h3>
            <h4>Room Details:</h4>
            <section>
              <p>Upcoming reservation at OVERLOOK for ${trip.date}.
              The room we have reserved for you is a ${trip.roomType}, and you
              will be staying in room number ${trip.roomNumber}. Every ${trip.roomType}
              has between 900 and 1,100 square feet, high quality pillow-top beds,
              a 62-inch flat-screen television, a work-space with a desk, and a kitchenette
              complete with a microwave, pre-stocked mini-fridge, and complimentary coffee.</p>
              <p>Confirmation code: ${trip.id}</p>
            </section>
          </div>
          <div class="image-holder">
            <img class="room-image" src="${trip.image}">
          </div>
        </div>`)
      })
    } else {
      $('#future-reservations-container').html(`
        <p id="no-upcoming-trips-warning">You do not have any upcoming trips with OVERLOOK.
        If you would like to book a trip, please use the date
        selector on the left-hand side of the page.</p>`)
    }
  },
  displayCustomerSpendingHistory(totalSpent, futureSpent, pastSpent) {
    $('#customer-spending-history-container').html(`
        <h3>Since joining overlook, you have spent a total of:</h3>
        <h1 class="customer-cost">${totalSpent} USD.</h1>
        <h3>Your future trips come to a total of:</h3>
        <h1 class="customer-cost">${futureSpent} USD.</h1>
        <h3>Your past trips come to a total of:<h3>
        <h1 class="customer-cost">${pastSpent} USD</h1>`)
  },
  displayAvailableRoomsForCustomer(availableRooms) {
    $('#customer-available-rooms-container').empty();
    availableRooms.forEach(room => {
      $('#customer-available-rooms-container').append(`
        <div class="available-room-card">
          <h2>Available: <span class="capitalize">${room.roomType}</span></h2>
          <img class="available-room-image" src="${room.image}">
          <p>This room has ${room.bedSize}-sized beds.</p>
          <p>Number of beds: ${room.numBeds}</p>
          <h3>Additional Details:</h3>
          <p>Every <span class="capitalize">${room.roomType}</span> has between 900 and 1,100 square feet,
          high quality pillow-top beds, a 62-inch flat-screen television,
          a work-space with a desk, and a kitchenette complete with a
          microwave, pre-stocked mini-fridge, and complimentary coffee</p>
          <button id="${room.number}" class="book-reservation-button">Book This Room</button>
        </div>`)
    })
  },
  displayAvailableRoomsForManager(availableRooms) {
    $('#manager-available-rooms-container').empty();
    availableRooms.forEach(room => {
      $('#manager-available-rooms-container').append(`
        <div class="available-room-card">
          <h2>Available: <span class="capitalize">${room.roomType}</span></h2>
          <img class="manager-available-room-image" src="${room.image}">
          <p>This room has ${room.bedSize}-sized beds.</p>
          <p>Number of beds: ${room.numBeds}</p>
          <button id="${room.number}" class="book-reservation-button">Book This Room</button>
        </div>`)
    })
  },
  displayTodayReservations(todaysBookings) {
    todaysBookings.forEach(reservation => {
      $('#today-reservations-container').append(`
        <div class="reservation-card">
          <h3 class="reservation-card-name">Upcoming Reservation for ${reservation.name}</h3>
          <section class="reservation-details-container">
            <ul>
              <li>Arrival Date: ${reservation.date}</li>
              <li>UserID: ${reservation.userID}</li>
              <li>Room Type & Number: <span class="capitalize">${reservation.roomType}</span>, #${reservation.roomNumber}</li>
              <li>Bidet: ${reservation.bidet}</li>
              <li>Bed Size & Number of Beds: <span class="capitalize">${reservation.bedSize}</span>, ${reservation.numBeds}</li>
              <li>Nightly rate: ${reservation.costPerNight} USD</li>
            </ul>
          </section>
          <button class="cancel-reservation-button">Cancel Reservation</button>
        </div>`)
    })
  },
  displayPercentageOccupiedToday(percent) {
    $('#percent-occupied-today').text(`OVERLOOK is ${percent}% booked today`);
  },
  displayRoomsAvailableToday(roomsAvailable) {
    roomsAvailable.forEach(room => {
      $('#rooms-available-today-container').append(`
        <div class="room-available-card">
          <p class="capitalize">Room Number ${room.number}, ${room.roomType}</p>
        </div>`)
    })
  },
  displayRevenue(revenueToday, revenueAllTime) {
    $('#current-revenue-container').html(`
      <p class="revenue-details">Total revenue accrued over the past 24 hours:</p>
      <span class="revenue-stat">${revenueToday} USD</span>
      <p class="revenue-details">Total revenue since OVERLOOK's initial opening:</p>
      <span class="revenue-stat">${revenueAllTime} USD</span>
    `)
  },
  displayAllGuests(guests) {
    guests.forEach(guest => {
      $('#all-guests-container').append(`
        <div id=${guest.id} class="guest-card">
          <div class="guest-info">
            <p class="guest-card-name">${guest.name}</p>
            <p class="guest-card-name">UserID: ${guest.id}</p>
          </div>
          <button class="expand-guest-info-button"><img class="guest-info-image"src="https://image.flaticon.com/icons/svg/1828/1828885.svg"></button>
        </div>`)
    })
  },
  expandSpecificGuestInfo(guest) {
    $('#all-guests-container').addClass('hide');
    $('#specific-guest-container').removeClass('hide').html(`
      <div class="specific-guest-card">
        <h3 class="specific-guest-name">${guest.name}, UserID: <span id="manager-cust-id">${guest.id}</span></h3>
        <section class="specific-guest-details-container">
          <p>${guest.name} has been on ${guest.pastTrips.length} trips with OVERLOOK.
          Guest has ${guest.upcomingTrips.length} reservations booked for the future.</p>
        </section>
        <h3 class="specific-guest-booking-header">Create booking for ${guest.name}:</h3>
        <section class="specific-guest-booking-container">
          <label class="future-date-text" for="manager-arrival-date-input">Arrival date:<label>
          <input type="date" class="specific-booking-input" id="manager-arrival-date-input" placeholder="mm/dd/yyyy">
          <label class="future-date-text" for="departure-date-input">Departure date:<label>
          <input type="date" class="specific-booking-input" id="departure-date-input" placeholder="mm/dd/yyyy">
          <button type="button" class="manager-search-dates-button">Search availability</button>
        </section>
      </div>`);
  },
  displayCustomerReservationConfirmation(user, date, roomNumber) {
    $('#customer-available-rooms-container').empty();
    $('#customer-available-rooms-container').html(`
      <section id="customer-booking-confirmation-card">
        <h2>Congratulations, ${user.name}!</h2>
        <p>Your stay at OVERLOOK for ${date} is now on the books<p>
        <p>You will be staying in room number ${roomNumber}.</p>
        <p>A reservation confirmation has been sent directly to your email.</p>
        <p>If you need to cancel or modify this reservation, please send us an email
        at reservations@overlook.com We look forward to seeing you!</p>
      </section>`)
  },
  displayManagerReservationConfirmation(user, date, roomNumber) {
    $('#manager-available-rooms-container').empty();
    $('#manager-available-rooms-container').html(`
      <section id="manager-booking-confirmation-card">
        <h2>Thank you for utilizing the OVERLOOK Management Portal</h2>
        <p>Reservation for ${user.name} on ${date} is confirmed</p>
        <p>A reservation confirmation has been sent to the user's email
        on file, and OVERLOOK's booking system has been updated.</p>
      </section>`)
  }
}

export default domUpdates;
