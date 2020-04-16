import $ from 'jquery';
import Booking from './booking';
import Hotel from './hotel';
import Manager from './manager';
import Room from './room';
import User from './user';

let domUpdates = {
  displayUserName(user) {
    $('#username-header').text(user.name);
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
  }
}

export default domUpdates;