/* eslint-disable no-undef */

module.exports = {
  name: {
    type: String,
    required: [true, 'Name is requird!'],
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    min: 6,
  },
  salt: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['admin', 'shopAdmin', 'customer'],
    requried: true,
    default: 'customer',
  },
  isAccountLocked: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  location: {
    lati: String,
    longi: String,
  },
};
