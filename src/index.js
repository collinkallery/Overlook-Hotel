// IMPORTS
import $ from 'jquery';
import './css/base.scss';
import Hotel from './hotel';
import Manager from './manager';
import User from './user';
import domUpdates from './domUpdates'

// GLOBALS
var Moment = require('moment');
let userData;
let roomData;
let bookingData;
let hotel;
let manager;
let todayDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''));

// FETCHING
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

// PROMISE
Promise.all([userData, roomData, bookingData])
  .then(data => {
    userData = data[0];
    roomData = data[1];
    bookingData = data[2];
  })
  .then(() => {
    createHotel(userData, roomData, bookingData);
    instantiateAllUsers();
    attachImagesToRooms();
    createRoomObjects();
    createBookingObjects();
    hotel.setUpHotel(todayDate);
    loadInitialDom();
    console.log('Data Received');
  })
  .catch(error => {
    console.log('Something is amiss with promise all', error)
  });

// INSTANTIATION
let createHotel = (userData, roomData, bookingData) => {
  hotel = new Hotel(userData, roomData, bookingData);
}

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
      'numBeds': room.numBeds,
      'costPerNight': room.costPerNight,
      'image': room.image
    }
    hotel.allRooms.push(roomObject);
  })
}

let createBookingObjects = () => {
  hotel.allBookings = matchRoomsToBookings();
}

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

// SIGNING IN / SIGNING OUT
$('#login-button').on('click', (event) => signIntoOverlook());

let loadInitialDom = () => {
  $('#customer-page').removeClass('flex').addClass('hide');
  $('#manager-page').removeClass('flex').addClass('hide');
  $('#login-page').removeClass('hide').addClass('flex');
  $('.logout-button').addClass('hide');
}

function signIntoOverlook() {
  if ($('#username-input').val().includes('manager') && (($('#password-input').val() === 'overlook2019'))) {
    manager = new Manager();
    hotel.setUpManager();
    $('.logout-button').removeClass('hide');
    $('#username-input').val('');
    $('#password-input').val('');
  } else {
    alert('Incorrect username or password. Please try again.');
  }
  if ($('#username-input').val().includes('customer')) {
    if ((hotel.findSpecificUserByUsername($('#username-input').val()) === undefined) || ($('#password-input').val() != 'overlook2019')){
      alert('Incorrect username or password. Please try again.')
    } else {
      hotel.setUpCustomer($('#username-input').val());
      $('.logout-button').removeClass('hide');
      $('#username-input').val('');
      $('#password-input').val('');
    }
  }
}

$('.logout-button').on('click', function(event) {
  loadInitialDom();
  $('#past-reservations-container').empty();
  $('#future-reservations-container').empty();
  $('#customer-available-rooms-container').empty();
  $('#manager-available-rooms-container').empty();
  $('#specific-guest-container').empty();
  $('#specific-guests-trips-container').empty();
  $('#all-guests-container').removeClass('hide');
  $('select').css({
    'display': 'none'
  });
  $('#arrival-date-input').val('');

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
      createHotel(userData, roomData, bookingData);
      instantiateAllUsers();
      attachImagesToRooms();
      createRoomObjects();
      createBookingObjects();
      hotel.setUpHotel(todayDate);
      loadInitialDom();
      console.log('Data Received');
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    });
});

// CUSTOMER JQ EVENTS
$('#view-more-past-trips-button').click(function() {
  $('#past-reservations-container div:hidden').slice(0, 5).slideDown();
});

$('#customer-search-dates-button').on('click', function() {
  let arrivalDate = Number($('#arrival-date-input').val().split('-').join(''));
  hotel.findRoomsAvailableGivenDate(arrivalDate);
  $('#arrival-date-input').val('');
});

$('#customer-available-rooms-container').on('click', 'button', function(event) {
  let chosenUser = hotel.findSpecificUserById($('#cust-id').text());
  let chosenDate = $('#arrival-date-input').val().split('-').join('/');
  let chosenRoom = Number($(event.target).attr('id'));
  chosenUser.createBooking(chosenUser, chosenUser.id, chosenDate, chosenRoom);
});

$('#refresh-trips-button').on('click', function() {
  let chosenUser = hotel.findSpecificUserById($('#cust-id').text())
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
      createHotel(userData, roomData, bookingData);
      instantiateAllUsers();
      attachImagesToRooms();
      createRoomObjects();
      createBookingObjects();
      hotel.setUpHotel(todayDate);
      resetCustomerPage(chosenUser);
      console.log('Data Received');
    })
    .catch(error => {
      console.log('Something is amiss with promise all', error)
    });
});

let resetCustomerPage = (chosenUser) => {
  chosenUser.collectCustomerInformation();
  $('#past-reservations-container').empty();
  $('#future-reservations-container').empty();
  $('select').css({
    'display': 'none'
  });
  $('#arrival-date-input').val('');
  hotel.setUpCustomer(chosenUser.username);
}

// MANAGER JQ EVENTS
$('#all-guests-container').on('click', 'button', function(event) {
  domUpdates.expandSpecificGuestInfo(hotel.findSpecificUserById($(event.target).parent().parent().attr('id')))
});

$('#specific-guest-container').on('click', 'button', function(event) {
  let arrivalDate = Number($('#manager-arrival-date-input').val().split('-').join(''));
  hotel.findRoomsAvailableGivenDate(arrivalDate);
});

$('#manager-available-rooms-container').on('click', 'button', function(event) {
  let chosenUser = hotel.findSpecificUserById($('#manager-cust-id').text())
  let chosenDate = $('#manager-arrival-date-input').val().split('-').join('/');
  let chosenRoom = Number($(event.target).attr('id'));
  manager.createBooking(chosenUser, chosenUser.id, chosenDate, chosenRoom);
});

$('#back-to-all-guests-button').on('click', function() {
  $('#specific-guest-container').empty();
  $('#all-guests-container').removeClass('hide');
  $('#manager-available-rooms-container').empty();
  $('#specific-guest-trips-container').empty();
});

$('#see-guest-trips-button').on('click', function() {
  let chosenUser = hotel.findSpecificUserById($('#manager-cust-id').text())
  domUpdates.showSpecificGuestTrips(chosenUser.upcomingTrips);
})

$('.manager-search-customer-input').on('keyup change', function() {
  let allGuests = Array.from(document.querySelectorAll('.guest-card'));
  console.log(allGuests);
  allGuests.forEach(guest => {
    guest.classList.remove('hide');
    guest.classList.add('flex')
    console.log($('.manager-search-customer-input').val());
    if (!guest.innerText.includes($('.manager-search-customer-input').val())) {
      guest.classList.remove('flex');
      guest.classList.add('hide');
    }
  })
});

$('#specific-guest-trips-container').on('click', 'button', function() {
  let tripId = Number($(event.target).attr('id'));
  manager.deleteBooking(tripId);
  alert(`Booking #${tripId} has successfully been deleted.`)
})

$('select').on('change', function() {
  let allAvailableRooms = Array.from(document.querySelectorAll('.available-room-card'));
  let roomType = (this.value).split(' ').join('');
  allAvailableRooms.forEach(room => {
    room.classList.remove('hide');
    if (!room.classList.contains(roomType)) {
      room.classList.add('hide');
    }
    if (this.value === 'all rooms') {
      room.classList.remove('hide');
    }
  })
});
