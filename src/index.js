import $ from 'jquery';
import './css/base.scss';
import Booking from './booking';
import Hotel from './hotel';
import Manager from './manager';
import Room from './room';
import User from './user';
var Moment = require('moment');

let userData;
let roomData;
let bookingData;
let hotel;
let todayDate = Moment().format('YYYY/MM/DD');

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
  })
  .then(() => {
    hotel = new Hotel(userData, roomData, bookingData);
    instantiateAllUsers();
    matchRoomsToBookings();
    attachImagesToRooms();
    createRoomObjects();
    createBookingObjects();
    loadPage();
    console.log('Data Received');
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

let createRoomObjects = () => {
  roomData.forEach(room => {
    let roomObject = {
      'number': room.number,
      'roomType': room.roomType,
      'bidet': room.bidet,
      'bedSize': room.bedSize,
      'numBeds': room.numBeds
    }
    hotel.allRooms.push(roomObject);
  })
}

let createBookingObjects = () => {
  hotel.allBookings = matchRoomsToBookings();
}

$('#login-button').on('click', (event) => signIntoOverlook());

function loadPage() {
  $('#customer-page').removeClass('flex').addClass('hide');
  $('#manager-page').removeClass('flex').addClass('hide');
}

function signIntoOverlook() {
  hotel.setUpUser($('#username-input').val());
  $('#login-page').removeClass('flex').addClass('hide');
  $('#customer-page').removeClass('hide').addClass('flex');
}

$('#view-more-past-trips-button').click(function() {
  $('#past-reservations-container div:hidden').slice(0, 5).slideDown();
});

function matchRoomsToBookings() {
  let newBookings = []
  bookingData.map(booking => {
    roomData.forEach(room => {
      if (room.number === booking.roomNumber) {
        let bookingObject = {
          'id': booking.id,
          'userID': booking.userID,
          'date': booking.date,
          'roomNumber': room.number,
          'roomType': room.roomType,
          'bidet': room.bidet,
          'bedSize': room.bedSize,
          'numBeds': room.numBeds,
          'costPerNight': room.costPerNight,
          'roomServiceCharges': booking.roomServiceCharges,
          'image': room.image
        }
        newBookings.push(bookingObject);
      }
    })
  })
  return newBookings;
}

function attachImagesToRooms() {
  roomData.forEach(room => {
    if (room.roomType === 'residential suite') {
      room.image = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
    }
    if (room.roomType === 'suite') {
      room.image = 'https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'
    }
    if (room.roomType === 'single room') {
      room.image = 'https://images.unsplash.com/photo-1508253578933-20b529302151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2715&q=80'
    }
    if (room.roomType === 'junior suite') {
      room.image = 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'
    }
  })
}
