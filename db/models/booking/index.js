/* eslint-disable no-undef */
const afterSave = require('./hooks/after-save');

const BookingModel = new MongooseSchema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    cab: {
      type: ObjectId,
      ref: 'Cab',
    },
    totalAmount: Number,
    isPaid: {
      type: Boolean,
      default: true,
    },
    destination: {
      lati: String,
      longi: String,
    },
    totalDistance: Number,
    noOfPassenger: Number,
  },
  {
    timestamps: true,
  }
);

BookingModel.post('save', afterSave);

module.exports = MongooseConnect.model('Booking', BookingModel);
