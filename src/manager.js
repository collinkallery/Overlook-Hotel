import domUpdates from './domUpdates'

class Manager {
  constructor() {
    this.username = 'manager';
    this.password = 'overlook2019';
  }
  createBooking(user, userID, date, roomNumber) {
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
    domUpdates.displayManagerReservationConfirmation(user, date, roomNumber);
  };
  deleteBooking() {
    console.log('deleteReached')
  }
  searchByCustomerName() {
    // method that allows manager to
    // search through all users by their
    // name and filter out others
  }
}

export default Manager;
