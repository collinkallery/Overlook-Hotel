import $ from 'jquery';
import './css/base.scss';
import Booking from './booking';
import Hotel from './hotel';
import Manager from './manager';
import Room from './room';
import User from './user';

let userData;
let roomData;
let bookingData;
let hotel;

userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json())
  .then(data => data.users)
  .catch(error => console.log('userData error'));

roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)
  .catch(error => console.log('userData error'));

bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)
  .catch(error => console.log('userData error'));

Promise.all([userData, roomData, bookingData])
  .then(data => {
    userData = data[0];
    roomData = data[1];
    bookingData = data[2];
    console.log(bookingData);
  })
  .then(() => {
    hotel = new Hotel(userData, roomData, bookingData);
    instantiateAllUsers();
    instantiateAllRooms();
    instantiateAllBookings();
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });

let instantiateAllUsers = () => {
  userData.forEach(user => {
    user = new User(user);
    hotel.guests.push(user);
  })
};

let instantiateAllRooms = () => {
  roomData.forEach(room => {
    room = new Room(room);
    hotel.allRooms.push(room);
  })
};

let instantiateAllBookings = () => {
  bookingData.forEach(booking => {
    booking = new Booking(booking);
    hotel.allBookings.push(booking);
  })
};
