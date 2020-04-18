import domUpdates from './domUpdates'
var Moment = require('moment');
let todayDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''));

class User {
  constructor(user) {
    this.username = `customer${user.id}`;
    this.password = 'overlook2019';
    this.id = user.id;
    this.name = user.name;
    // this.amountSpent = amountSpent;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.allBookings = [];
  }
  createBooking() {
    // method that allows a customer to
    // create a booking
  }
  viewUpcomingTrips() {
    // method that shows a user all of their
    // upcoming trips
  }
  viewPastTrips() {
    // method that shows a user all of their
    // past trips
  }
  viewAmountSpent() {
    // method that calculates the total amount
    // of money spent on all booked trips
  }
  organizeTrips() {
    this.allBookings.forEach(trip => {
      let date = Number(trip.date.split('/').join(''));
      if (date > todayDate) {
        this.upcomingTrips.push(trip)
      } else {
        this.pastTrips.push(trip);
      }
    })
    domUpdates.displayPastTrips(this.pastTrips);
    domUpdates.displayUpcomingTrips(this.upcomingTrips);
  }
}

export default User;
