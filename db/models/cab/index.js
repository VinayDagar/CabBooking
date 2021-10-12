/* eslint-disable no-undef */
// const beforeSave = require('./hooks/before-save');

const CabModel = new MongooseSchema(
  {
    model: String,
    location: {
      lati: String,
      longi: String,
    },
    baseCharges: Number,
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// CabModel.pre('save', beforeSave);

module.exports = MongooseConnect.model('Cab', CabModel);
