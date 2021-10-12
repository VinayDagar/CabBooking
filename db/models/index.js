// All data base models

const User = require('./user');
const Cab = require('./cab');
const Booking = require('./booking');

const domain = {
  User,
  Booking,
  Cab,
};

module.exports = domain;
