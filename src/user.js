import domUpdates from './domUpdates'
var Moment = require('moment');
let todayDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''));

class User {
  constructor(user) {
    this.username = `customer${user.id}`;
    this.password = 'overlook2019';
    this.id = user.id;
    this.name = user.name;
    this.totalAmountSpent = 0;
    this.upcomingTripsCost = 0;
    this.pastTripsCost = 0;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.allBookings = [];
  }
  collectCustomerInformation() {
    this.calculateTotalAmountSpent();
    this.calculateAmountSpentFutureTrips();
    this.calculateAmountSpentPastTrips();
    domUpdates.displayCustomerPastTrips(this.pastTrips);
    domUpdates.displayCustomerUpcomingTrips(this.upcomingTrips);
    domUpdates.displayCustomerSpendingHistory(this.totalAmountSpent, this.upcomingTripsCost, this.pastTripsCost);
    domUpdates.showCustomerPage(this.name);
  }
  createBooking(userID, date, roomNumber) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userID": userID,
          "date": date,
          "roomNumber": roomNumber
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  viewUpcomingTrips() {
    // method that shows a user all of their
    // upcoming trips
  }
  viewPastTrips() {
    // method that shows a user all of their
    // past trips
  }
  calculateTotalAmountSpent() {
    let totalSpent = this.allBookings.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc;
    }, 0);
    this.totalAmountSpent = Number(totalSpent.toFixed(2));
  }
  calculateAmountSpentFutureTrips() {
    let totalSpent = this.upcomingTrips.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc;
    }, 0);
    this.upcomingTripsCost = Number(totalSpent.toFixed(2));
  }
  calculateAmountSpentPastTrips() {
    let totalSpent = this.pastTrips.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc;
    }, 0);
    this.pastTripsCost = Number(totalSpent.toFixed(2));
  }
}

export default User;
