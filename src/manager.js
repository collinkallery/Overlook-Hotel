class Manager {
  constructor() {
    this.username = 'manager';
    this.password = 'overlook2019';
  }
  createBooking() {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
  deleteBooking() {
    // method that allows manager to
    // delete booking for a customer
  }
  searchByCustomerName() {
    // method that allows manager to
    // search through all users by their
    // name and filter out others
  }
}

export default Manager;
