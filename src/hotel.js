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
  calculateRevenue() {
    // method that adds up all
    // revenue across all bookings
  }
}

export default Hotel;
