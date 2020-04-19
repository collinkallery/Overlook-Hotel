import domUpdates from './domUpdates'
var Moment = require('moment');

class Hotel {
  constructor(userData, roomData, bookingData) {
    this.userData = userData;
    this.roomData = roomData;
    this.bookingData = bookingData;
    this.todayRevenue = 0;
    this.allTimeRevenue = 0;
    this.percentOccupiedToday = 0;
    this.allRooms = [];
    this.guests = [];
    this.allBookings = [];
    this.todaysBookings = [];
    this.roomsAvailableToday = [];
  }
  setUpHotel(todayDate) {
    this.matchNamesToBookings();
    this.sortAllBookings();
    this.disperseTrips();
    this.organizeTripsByTodaysDate(todayDate);
    this.findTodaysBookings(todayDate);
    this.calculateRevenueToday(todayDate);
    this.calculateRevenueAllTime();
    this.calculatePercentageOfRoomsBookedToday(todayDate);
    this.findRoomsAvailableToday(todayDate);
  }
  setUpCustomer(username) {
    let chosenUser = this.findSpecificUserByUsername(username);
    domUpdates.displayPastTrips(chosenUser.pastTrips);
    domUpdates.displayUpcomingTrips(chosenUser.upcomingTrips);
    domUpdates.showCustomerPage(chosenUser);
  }
  setUpManager() {
    domUpdates.showManagementPage();
    domUpdates.displayAllReservations(this.allBookings);
    domUpdates.displayAllGuests(this.guests);
  }
  findSpecificUserByUsername(username) {
    let chosenUser = this.guests.find(guest => username === guest.username);
    return chosenUser;
  }
  findSpecificUserById(id) {
    let chosenUser = this.guests.find(guest => id == guest.id);
    return chosenUser;
  }
  matchNamesToBookings() {
    this.allBookings.map(booking => {
      this.guests.forEach(guest => {
        if (booking.userID === guest.id) {
          booking.name = guest.name;
        }
      })
    })
  }
  sortAllBookings() {
    let sortedTrips = this.allBookings.sort((a, b) => new Moment(b.date).format('YYYYMMDD') - new Moment(a.date).format('YYYYMMDD'))
    sortedTrips = this.allBookings;
  }
  disperseTrips() {
    this.guests.forEach(guest => {
      let guestTrips = this.allBookings.filter(booking => booking.userID === guest.id);
      guest.allBookings = guestTrips;
    })
  }
  organizeTripsByTodaysDate(todayDate) {
    this.guests.map(guest => {
      guest.allBookings.forEach(booking => {
        let date = Number(booking.date.split('/').join(''));
        if (date >= todayDate) {
          guest.upcomingTrips.push(booking);
        } else {
          guest.pastTrips.push(booking);
        }
      })
    })
  }
  findTodaysBookings(todayDate) {
    this.allBookings.filter(booking => {
      let date = Number(booking.date.split('/').join(''));
      if (date == todayDate) {
        this.todaysBookings.push(booking);
      }
    })
  }
  calculateRevenueToday(todayDate) {
    let todayRevenue = this.todaysBookings.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc;
    }, 0);
    this.todayRevenue = todayRevenue;
  }
  calculateRevenueAllTime() {
    let allTimeRevenue = this.allBookings.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc;
    }, 0);
    this.allTimeRevenue = allTimeRevenue;
  }
  calculatePercentageOfRoomsBookedToday(todayDate) {
    let roomsOccupied = this.allBookings.reduce((acc, booking) => {
      let date = Number(booking.date.split('/').join(''));
      if (date == todayDate) {
        acc += 1;
      }
      return acc;
    }, 0);
    let percentOccupied = Math.floor((roomsOccupied / this.allRooms.length) * 100);
    this.percentOccupiedToday = percentOccupied;
  }
  findRoomsAvailableToday(todayDate) {
    let unoccupiedRooms = this.allBookings.filter(booking => {
      let date = Number(booking.date.split('/').join(''));
      return (date != todayDate);
    })
    unoccupiedRooms.map(openRoom => {
      this.allRooms.forEach(room => {
        if (openRoom.roomNumber === room.number) {
          this.roomsAvailableToday.push(room);
        }
      })
    })
  }
}

export default Hotel;
