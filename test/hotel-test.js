import $ from 'jquery';
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
let todayDate = Number('20200211');

import Hotel from '../src/hotel';
import Manager from '../src/manager';
import User from '../src/user';
import domUpdates from '../src/domUpdates'

describe('Hotel', function() {

  let guest1;
  let guest2;
  let guest3;
  let room1;
  let room2;
  let room3;
  let room4;
  let room5;
  let room6;
  let booking1;
  let booking2;
  let booking3;
  let booking4;
  let booking5;
  let booking6;
  let hotel;

  afterEach(() => {
    chai.spy.restore(domUpdates);
  });

  beforeEach(() => {

    chai.spy.on(domUpdates, "showManagementPage", () => {});
    chai.spy.on(domUpdates, "displayTodayReservations", () => {});
    chai.spy.on(domUpdates, "displayAllGuests", () => {});
    chai.spy.on(domUpdates, "displayPercentageOccupiedToday", () => {});
    chai.spy.on(domUpdates, "displayRoomsAvailableToday", () => {});

    guest1 = new User({
      'username': 'customer1',
      'password': 'overlook2019',
      'id': 1,
      'name': 'Leatha Ullrich',
      'pastTrips': [],
      'upcomingTrips': [],
      'allBookings': []
    });

    guest2 = new User({
      'username': 'customer2',
      'password': 'overlook2019',
      'id': 2,
      'name': 'Rocio Schuster',
      'pastTrips': [],
      'upcomingTrips': [],
      'allBookings': []
    });

    guest3 = new User({
      'username': 'customer3',
      'password': 'overlook2019',
      'id': 3,
      'name': 'Kelvin Schiller',
      'pastTrips': [],
      'upcomingTrips': [],
      'allBookings': []
    });

    room1 = {
      'number': 12,
      'roomType': 'single room',
      'bidet': false,
      'bedSize': 'twin',
      'numBeds': 2,
      'costPerNight': 172.09
    }

    room2 = {
      'number': 20,
      'roomType': 'residential suite',
      'bidet': false,
      'bedSize': 'queen',
      'numBeds': 1,
      'costPerNight': 343.95
    }

    room3 = {
      'number': 18,
      'roomType': 'junior suite',
      'bidet': false,
      'bedSize': 'king',
      'numBeds': 2,
      'costPerNight': 496.41
    }

    room4 = {
      'number': 9,
      'roomType': 'single room',
      'bidet': true,
      'bedSize': 'queen',
      'numBeds': 1,
      'costPerNight': 200.39
    }

    room5 = {
      'number': 8,
      'roomType': 'junior suite',
      'bidet': false,
      'bedSize': 'king',
      'numBeds': 1,
      'costPerNight': 261.26
    }

    room6 = {
      'number': 23,
      'roomType': 'residential suite',
      'bidet': false,
      'bedSize': 'queen',
      'numBeds': 2,
      'costPerNight': 176.36
    }

    booking1 = {
      'id': '5fwrgu4i7k55hl6t8',
      'userID': 1,
      'date': '2020/08/05',
      'roomNumber': 12,
      'roomType': 'single room',
      'bidet': false,
      'bedSize': 'twin',
      'numBeds': 2,
      'costPerNight': 172.09,
      'roomServiceCharges': []
    }

    booking2 = {
      'id': '5fwrgu4i7k55hl6x8',
      'userID': 1,
      'date': '2020/01/11',
      'roomNumber': 20,
      'roomType': 'residential suite',
      'bidet': false,
      'bedSize': 'queen',
      'numBeds': 1,
      'costPerNight': 343.95,
      'roomServiceCharges': []
    }

    booking3 = {
      'id': '5fwrgu4i7k55hl6uf',
      'userID': 2,
      'date': '2020/01/09',
      'roomNumber': 18,
      'roomType': 'junior suite',
      'bidet': false,
      'bedSize': 'king',
      'numBeds': 2,
      'costPerNight': 496.41,
      'roomServiceCharges': []
    }

    booking4 = {
      'id': '5fwrgu4i7k55hl6vw',
      'userID': 2,
      'date': '2020/02/11',
      'roomNumber': 9,
      'roomType': 'single room',
      'bidet': true,
      'bedSize': 'queen',
      'numBeds': 1,
      'costPerNight': 200.39,
      'roomServiceCharges': []
    }

    booking5 = {
      'id': '5fwrgu4i7k55hl6tl',
      'userID': 3,
      'date': '2020/01/10',
      'roomNumber': 8,
      'roomType': 'junior suite',
      'bidet': false,
      'bedSize': 'king',
      'numBeds': 1,
      'costPerNight': 261.26,
      'roomServiceCharges': []
    }

    booking6 = {
      'id': '5fwrgu4i7k55hl6v3',
      'userID': 3,
      'date': '2020/02/11',
      'roomNumber': 23,
      'roomType': 'residential suite',
      'bidet': false,
      'bedSize': 'queen',
      'numBeds': 2,
      'costPerNight': 176.36,
      'roomServiceCharges': []
    }

    hotel = new Hotel();
    hotel.guests.push(guest1, guest2, guest3);
    hotel.allRooms.push(room1, room2, room3, room4, room5, room6);
    hotel.allBookings.push(booking1, booking2, booking3, booking4, booking5, booking6);
  })

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });
  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });
  it('should hold on to the guests of the hotel', function() {
    expect(hotel.guests).to.deep.equal([guest1, guest2, guest3])
  });
  it('should have multiple different rooms', function() {
    expect(hotel.allRooms).to.deep.equal([room1, room2, room3, room4, room5, room6])
  });
  it('should hold onto all of its bookings', function() {
    expect(hotel.allBookings).to.deep.equal([booking1, booking2, booking3, booking4, booking5, booking6])
  });
  it('should match guest names to each booking', function() {
    hotel.matchNamesToBookings()
    expect(hotel.allBookings[0]).to.deep.equal({
      id: '5fwrgu4i7k55hl6t8',
      userID: 1,
      date: '2020/08/05',
      roomNumber: 12,
      roomType: 'single room',
      bidet: false,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 172.09,
      roomServiceCharges: [],
      name: 'Leatha Ullrich'
    })
  });
  it('should sort all of the bookings from future to past', function() {
    hotel.sortAllBookings()
    expect(hotel.allBookings).to.deep.equal([{
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2020/08/05',
        roomNumber: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6vw',
        userID: 2,
        date: '2020/02/11',
        roomNumber: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6v3',
        userID: 3,
        date: '2020/02/11',
        roomNumber: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6x8',
        userID: 1,
        date: '2020/01/11',
        roomNumber: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6tl',
        userID: 3,
        date: '2020/01/10',
        roomNumber: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6uf',
        userID: 2,
        date: '2020/01/09',
        roomNumber: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41,
        roomServiceCharges: []
      }
    ])
  });
  it('should disperse all bookings to the correct guest', function() {
    hotel.matchNamesToBookings();
    hotel.sortAllBookings();
    hotel.disperseTrips();
    expect(hotel.guests[0].allBookings).to.deep.equal([{
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2020/08/05',
        roomNumber: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09,
        roomServiceCharges: [],
        name: 'Leatha Ullrich'
      },
      {
        id: '5fwrgu4i7k55hl6x8',
        userID: 1,
        date: '2020/01/11',
        roomNumber: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        roomServiceCharges: [],
        name: 'Leatha Ullrich'
      }
    ])
  });
  it('should separate trips for each guest into upcoming and past trips', function() {
    hotel.matchNamesToBookings();
    hotel.sortAllBookings();
    hotel.disperseTrips();
    hotel.organizeTripsByTodaysDate(todayDate);
    expect(hotel.guests[0].pastTrips).to.deep.equal([{
      id: '5fwrgu4i7k55hl6x8',
      userID: 1,
      date: '2020/01/11',
      roomNumber: 20,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 343.95,
      roomServiceCharges: [],
      name: 'Leatha Ullrich'
    }])
    expect(hotel.guests[0].upcomingTrips).to.deep.equal([{
      id: '5fwrgu4i7k55hl6t8',
      userID: 1,
      date: '2020/08/05',
      roomNumber: 12,
      roomType: 'single room',
      bidet: false,
      bedSize: 'twin',
      numBeds: 2,
      costPerNight: 172.09,
      roomServiceCharges: [],
      name: 'Leatha Ullrich'
    }])
  });
  it('should be able to find a user from their ID', function() {
    expect(hotel.findSpecificUserById(1)).to.equal(hotel.guests[0]);
    expect(hotel.findSpecificUserById(3)).to.equal(hotel.guests[2]);
  });
  it('should find all the bookings for today', function() {
    hotel.findTodaysBookings(todayDate);
    expect(hotel.todaysBookings).to.deep.equal([{
      'id': '5fwrgu4i7k55hl6vw',
      'userID': 2,
      'date': '2020/02/11',
      'roomNumber': 9,
      'roomType': 'single room',
      'bidet': true,
      'bedSize': 'queen',
      'numBeds': 1,
      'costPerNight': 200.39,
      'roomServiceCharges': []
    }, {
      'id': '5fwrgu4i7k55hl6v3',
      'userID': 3,
      'date': '2020/02/11',
      'roomNumber': 23,
      'roomType': 'residential suite',
      'bidet': false,
      'bedSize': 'queen',
      'numBeds': 2,
      'costPerNight': 176.36,
      'roomServiceCharges': []
    }])
  });
  it('should calculate the revenue for today', function() {
    hotel.findTodaysBookings(todayDate);
    hotel.calculateRevenueToday(todayDate);
    expect(hotel.todayRevenue).to.deep.equal(376.75);
  });
  it('should calculate the revenue for all time', function() {
    hotel.calculateRevenueAllTime();
    expect(hotel.allTimeRevenue).to.deep.equal(1650.46);
  });
  it('should calculate the percentage of rooms booked today', function() {
    hotel.calculatePercentageOfRoomsBookedToday(todayDate);
    expect(hotel.percentOccupiedToday).to.deep.equal(33);
  });
  it('should find the rooms that are available for today', function() {
    hotel.findTodaysBookings(todayDate);
    hotel.findRoomsAvailableToday();
    expect(hotel.roomsAvailableToday).to.deep.equal([{
        number: 12,
        roomType: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09
      },
      {
        number: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95
      },
      {
        number: 18,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41
      },
      {
        number: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26
      }
    ])
  })
  it('should set up the DOM for the manager', function() {
    hotel.setUpManager();
    expect(domUpdates.showManagementPage).to.have.been.called(1);
    expect(domUpdates.displayTodayReservations).to.have.been.called(1);
    expect(domUpdates.displayTodayReservations).to.have.been.called.with(hotel.todaysBookings);
    expect(domUpdates.displayAllGuests).to.have.been.called(1);
    expect(domUpdates.displayAllGuests).to.have.been.called.with(hotel.guests);
    expect(domUpdates.displayPercentageOccupiedToday).to.have.been.called(1);
    expect(domUpdates.displayPercentageOccupiedToday).to.have.been.called.with(hotel.percentOccupiedToday);
    expect(domUpdates.displayRoomsAvailableToday).to.have.been.called(1);
    expect(domUpdates.displayRoomsAvailableToday).to.have.been.called.with(hotel.roomsAvailableToday);
  })
})
