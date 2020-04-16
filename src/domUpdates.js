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
        <div class="past-trip-card">
          <div class="info-holder">
            <h3 class="past-trip-header">Past Trip for ${trip.date}</h3>
            <h4>Room Details:</h4>
            <section>
              <p class="room-details-p">You stayed in a ${trip.roomType}.</p>
              <p class="room-details-p">Room Number: ${trip.roomNumber}</p>
              <p class="room-details-p">Bed Size: ${trip.bedSize}</p>
              <p class="room-details-p">Number of Beds: ${trip.numBeds}</p>
              <p class="room-details-p">Total Cost: ${trip.costPerNight}</p>
              <p>Confirmation code: ${trip.id}</p>
            </section>
          </div>
          <div class="image-holder">
            <img class="room-image" src="${trip.image}">
          </div>
        </div>`);
    })
  }
}

export default domUpdates;
