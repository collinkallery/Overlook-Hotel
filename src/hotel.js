import domUpdates from './domUpdates'

class Hotel {
  constructor(userData, roomData, bookingData) {
    this.userData = userData;
    this.roomData = roomData;
    this.bookingData = bookingData;
    // this.revenue = revenue;
    this.allRooms = [];
    this.guests = [];
    this.allBookings = [];
  }
  setUpCustomer(username) {
    let chosenUser = this.guests.find(guest => username === guest.username);
    let allUserTrips = this.allBookings.filter(booking => booking.userID === chosenUser.id);
    chosenUser.allBookings = allUserTrips;
    console.log(chosenUser.allBookings);
    domUpdates.displayUserName(chosenUser);
    chosenUser.sortTrips();
  }
  setUpManager() {
    // display today's reservations
    // show any roooms available
    // display % of rooms occupied today
  }
  calculateRevenue() {
    // method that adds up all
    // revenue across all bookings
  }
}

export default Hotel;
