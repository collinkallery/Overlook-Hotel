import $ from 'jquery';
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
let todayDate = Number('20200411');

import Hotel from '../src/hotel';
import Manager from '../src/manager';
import User from '../src/user';
import domUpdates from '../src/domUpdates'

describe('User', function() {

  let user;
  let booking1;
  let booking2;
  let booking3;
  let hotel;

  afterEach(() => {
    chai.spy.restore(domUpdates);
  });

  beforeEach(() => {

    chai.spy.on(domUpdates, "displayCustomerPastTrips", () => {});
    chai.spy.on(domUpdates, "displayCustomerUpcomingTrips", () => {});
    chai.spy.on(domUpdates, "displayCustomerSpendingHistory", () => {});
    chai.spy.on(domUpdates, "showCustomerPage", () => {});

    user = new User({
      'username': 'customer1',
      'password': 'overlook2019',
      'id': 1,
      'name': 'Leatha Ullrich',
      'totalAmountSpent': 0,
      'upcomingTripsCost': 0,
      'pastTripsCost': 0,
      'pastTrips': [],
      'upcomingTrips': [],
      'allBookings': []
    });

    booking1 = {
      'id': '5fwrgu4i7k55hl6vw',
      'userID': 1,
      'date': '2020/08/11',
      'roomNumber': 9,
      'roomType': 'single room',
      'bidet': true,
      'bedSize': 'queen',
      'numBeds': 1,
      'costPerNight': 200.39,
      'roomServiceCharges': []
    }

    booking2 = {
      'id': '5fwrgu4i7k55hl6tl',
      'userID': 1,
      'date': '2020/01/10',
      'roomNumber': 8,
      'roomType': 'junior suite',
      'bidet': false,
      'bedSize': 'king',
      'numBeds': 1,
      'costPerNight': 261.26,
      'roomServiceCharges': []
    }

    booking3 = {
      'id': '5fwrgu4i7k55hl6v3',
      'userID': 1,
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
    hotel.guests.push(user);
    hotel.allBookings.push(booking1, booking2, booking3);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });
  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });
  it('should have a username', function() {
    expect(user.username).to.deep.equal('customer1');
  });
  it('should have a password', function() {
    expect(user.password).to.deep.equal('overlook2019');
  });
  it('should have an ID', function() {
    expect(user.id).to.deep.equal(1);
  });
  it('should have a name', function() {
    expect(user.name).to.deep.equal('Leatha Ullrich');
  });
  it('should hold on to all of its bookings', function() {
    hotel.setUpHotel(todayDate);
    expect(user.allBookings).to.deep.equal([{
        id: '5fwrgu4i7k55hl6vw',
        userID: 1,
        date: '2020/08/11',
        roomNumber: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        roomServiceCharges: [],
        name: 'Leatha Ullrich'
      },
      {
        id: '5fwrgu4i7k55hl6v3',
        userID: 1,
        date: '2020/02/11',
        roomNumber: 23,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 176.36,
        roomServiceCharges: [],
        name: 'Leatha Ullrich'
      },
      {
        id: '5fwrgu4i7k55hl6tl',
        userID: 1,
        date: '2020/01/10',
        roomNumber: 8,
        roomType: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 261.26,
        roomServiceCharges: [],
        name: 'Leatha Ullrich'
      }
    ])
  });
  it('should hold on to all of its future bookings', function() {
    hotel.setUpHotel(todayDate);
    expect(user.upcomingTrips).to.deep.equal([{
        id: '5fwrgu4i7k55hl6vw',
        userID: 1,
        date: '2020/08/11',
        roomNumber: 9,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39,
        roomServiceCharges: [],
        name: 'Leatha Ullrich'
      }])
  });
  it('should hold on to all of its past bookings', function() {
    hotel.setUpHotel(todayDate);
    expect(user.pastTrips).to.deep.equal([{
      id: '5fwrgu4i7k55hl6v3',
      userID: 1,
      date: '2020/02/11',
      roomNumber: 23,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'queen',
      numBeds: 2,
      costPerNight: 176.36,
      roomServiceCharges: [],
      name: 'Leatha Ullrich'
    },
    {
      id: '5fwrgu4i7k55hl6tl',
      userID: 1,
      date: '2020/01/10',
      roomNumber: 8,
      roomType: 'junior suite',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 261.26,
      roomServiceCharges: [],
      name: 'Leatha Ullrich'
    }])
  });
  it('should calculate the total amount spent at hotel', function() {
    hotel.setUpHotel(todayDate);
    user.calculateTotalAmountSpent();
    expect(user.totalAmountSpent).to.deep.equal(638.01);
  });
  it('should calculate the total amount for upcoming trips', function() {
    hotel.setUpHotel(todayDate);
    user.calculateAmountSpentFutureTrips();
    expect(user.upcomingTripsCost).to.deep.equal(200.39);
  });
  it('should calculate the total amount spent for past trips', function() {
    hotel.setUpHotel(todayDate);
    user.calculateAmountSpentPastTrips();
    expect(user.pastTripsCost).to.deep.equal(437.62);
  });
  it('should set up the dashboard for the customer', function() {
    hotel.setUpHotel(todayDate);
    hotel.setUpCustomer('customer1');
    expect(domUpdates.displayCustomerPastTrips).to.have.been.called(1);
    expect(domUpdates.displayCustomerPastTrips).to.have.been.called.with(user.pastTrips);

    expect(domUpdates.displayCustomerUpcomingTrips).to.have.been.called(1);
    expect(domUpdates.displayCustomerUpcomingTrips).to.have.been.called.with(user.upcomingTrips);

    expect(domUpdates.displayCustomerSpendingHistory).to.have.been.called(1);
    expect(domUpdates.displayCustomerSpendingHistory).to.have.been.called.with(user.totalAmountSpent, user.upcomingTripsCost, user.pastTripsCost);

    expect(domUpdates.showCustomerPage).to.have.been.called(1);
    expect(domUpdates.showCustomerPage).to.have.been.called.with(user.name);
  })
})
