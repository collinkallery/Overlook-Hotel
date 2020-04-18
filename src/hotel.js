import domUpdates from './domUpdates'
var Moment = require('moment');
let todayDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''));



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
  setUpHotel() {
    this.matchNamesToBookings();
    this.sortAllBookings();
    this.disperseTrips();
    this.organizeTripsByTodaysDate();
  }
  setUpCustomer(username) {
    let chosenUser = this.findSpecificUserByUsername(username);
    domUpdates.displayPastTrips(chosenUser.pastTrips);
    domUpdates.showCustomerPage(chosenUser);
  }
  setUpManager() {
    domUpdates.showManagementPage();
    domUpdates.displayAllReservations(this.allBookings);
    domUpdates.displayAllGuests(this.guests);
  }
  disperseTrips() {
    this.guests.forEach(guest => {
      let guestTrips = this.allBookings.filter(booking => booking.userID === guest.id);
      guest.allBookings = guestTrips;
    })
  }
  organizeTripsByTodaysDate() {
    this.guests.map(guest => {
      guest.allBookings.forEach(booking => {
        let date = Number(booking.date.split('/').join(''));
        if (date > todayDate) {
          guest.upcomingTrips.push(booking);
        } else {
          guest.pastTrips.push(booking);
        }
      })
    })
  }
  findSpecificUserByUsername(username) {
    let chosenUser = this.guests.find(guest => username === guest.username);
    return chosenUser;
  }
  findSpecificUserById(id) {
    let chosenUser = this.guests.find(guest => id == guest.id);
    return chosenUser;
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
