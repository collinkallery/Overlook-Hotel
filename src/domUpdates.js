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

  showCustomerPage(user) {
    $('#login-page').removeClass('flex').addClass('hide');
    $('#customer-page').removeClass('hide').addClass('flex');
    $(".welcome-user").text(`Welcome, ${user.name}`);
  },
  displayPastTrips(trips) {
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
              We hope you enjoyed your stay at OVERLOOK. If you have time, please
              send us a review at reviews@overlook.com - we would love to hear
              about your stay, and we hope to see you again soon.</p>
              <p>Confirmation code: ${trip.id}</p>
            </section>
          </div>
          <div class="image-holder">
            <img class="room-image" src="${trip.image}">
          </div>
        </div>`);
    })
  },
  displayUpcomingTrips(trips) {
    trips.forEach(trip => {
      $('#future-reservations-container').append(`
        <div class="trip-card">
          <div class="info-holder">
            <h3 class="trip-header">Upcoming Trip for ${trip.date}</h3>
            <h4>Room Details:</h4>
            <section>
              <p>You have an upcoming trip reserved at OVERLOOK for ${trip.date}.
              The room we have reserved for you is a ${trip.roomType}, and you
              will be staying in room number ${trip.roomNumber}. Every ${trip.roomType}
              has between 900 and 1,100 square feet, high quality pillow-top beds with
              egyptian cotton sheets, a 62-inch flat-screen television, a work-space
              with a desk, and a kitchenette complete with a microwave, pre-stocked mini-fridge,
              and complimentary coffee. Every ${trip.roomType} also offers high-speed
              internet access and complimentary access to Netflix during your stay.</p>
              <p>Confirmation code: ${trip.id}</p>
            </section>
          </div>
          <div class="image-holder">
            <img class="room-image" src="${trip.image}">
          </div>
        </div>`)
    })
  },
  displayAllReservations(allReservations) {
    allReservations.forEach(reservation => {
      $('#manager-page-reservations-container').append(`
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
  displayAllGuests(guests) {
    guests.forEach(guest => {
      $('#all-guests-container').append(`
        <div class="guest-card">
          <p class="">${guest.name}, UserID: ${guest.id}</p>
        </div>`)
    })
  }
}

export default domUpdates;
