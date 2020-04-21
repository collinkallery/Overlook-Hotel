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
    this.distributeFinancialDetails();
    this.calculateRevenueToday(todayDate);
    this.calculateRevenueAllTime();
    this.calculatePercentageOfRoomsBookedToday(todayDate);
    this.findRoomsAvailableToday();
  }
  setUpCustomer(username) {
    let chosenUser = this.findSpecificUserByUsername(username);
    chosenUser.displayOnDashboard();
    // chosenUser.collectCustomerInformation();
  }
  setUpManager() {
    domUpdates.showManagementPage();
    domUpdates.displayTodayReservations(this.todaysBookings);
    domUpdates.displayAllGuests(this.guests);
    domUpdates.displayPercentageOccupiedToday(this.percentOccupiedToday);
    domUpdates.displayRoomsAvailableToday(this.roomsAvailableToday);
    domUpdates.displayRevenue(this.todayRevenue, this.allTimeRevenue);
  }
  distributeFinancialDetails() {
    this.guests.forEach(guest => {
      guest.collectCustomerInformation();
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
    this.todayRevenue = Number(todayRevenue.toFixed(2));
  }
  calculateRevenueAllTime() {
    let allTimeRevenue = this.allBookings.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc;
    }, 0);
    this.allTimeRevenue = Number(allTimeRevenue.toFixed(2));
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
  findRoomsAvailableToday() {
    this.allRooms.forEach(room => {
      this.roomsAvailableToday.push(room);
    })
    this.roomsAvailableToday.slice().reverse()
      .forEach(room => {
        this.todaysBookings.forEach(booking => {
          if (room.number === booking.roomNumber) {
            this.roomsAvailableToday.splice(this.roomsAvailableToday.indexOf(room), 1)
          }
        })
      })
  }
  findRoomsAvailableGivenDate(date) {
    let unavailableRooms = [];
    let availableRooms = this.allRooms;
    this.allBookings.filter(booking => {
      let bookingDate =  Number(booking.date.split('/').join(''));
      if (bookingDate === date) {
        unavailableRooms.push(booking);
      }
    });
    unavailableRooms.forEach(closedRoom => {
      this.allRooms.filter(room => {
        if (closedRoom.roomNumber === room.number) {
          availableRooms.splice(availableRooms.indexOf(room), 1)
        }});
    })
    domUpdates.displayAvailableRoomsForCustomer(availableRooms);
    domUpdates.displayAvailableRoomsForManager(availableRooms);
    return availableRooms;
  }
}

export default Hotel;
