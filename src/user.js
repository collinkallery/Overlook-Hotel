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
  calculateAmountSpent() {
    // method that calculates the total amount
    // of money spent on all booked trips
  }
}

export default User;
