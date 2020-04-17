import domUpdates from './domUpdates'
var Moment = require('moment');


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
    domUpdates.showCustomerPage(chosenUser);
    chosenUser.sortTrips();
  }
  setUpManager() {
    this.sortAllBookings();
    this.matchNamesToBookings();
    console.log(this.allBookings);
    domUpdates.showManagementPage();
    domUpdates.displayAllReservations(this.allBookings);
    domUpdates.displayAllGuests(this.guests);
  }
  calculateRevenue() {
    // method that adds up all
    // revenue across all bookings
  }
  calculatePercentageOfRoomsBooked() {

  }
  sortAllBookings() {
    let sortedTrips = this.allBookings.sort((a, b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'))
    sortedTrips = this.allBookings;
  }
  matchNamesToBookings() {
    let bookingsWithNames = this.allBookings.map(booking => {
      this.guests.forEach(guest => {
        if (booking.userID === guest.id) {
          booking.name = guest.name;
        }
      })
    })
    bookingsWithNames = this.allBookings;
  }
}

export default Hotel;
