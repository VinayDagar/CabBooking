const domain = require('../db/models');

/* eslint-disable no-undef */
exports.getBookingHistory = async (req, res, next) => {
  try {
    const bookings = await domain.Booking.find(
      {
        user: req.loggedInUser._id,
      },
      '-__v -updatedAt ',
      {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      }
    ).populate({
      path: 'cab',
      select: {
        _id: 1,
        baseCharges: 1,
        model: 1,
      },
    });

    const response = views.JsonView({ bookings });
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

exports.bookNearByCab = async (req, res, next) => {
  try {
    const { destination, noOfPassenger } = req.body;

    const cabs = await domain.Cab.find(
      {
        isBooked: false,
      },
      'location _id baseCharges'
    );

    if (!cabs || !cabs.length) {
      const error = new Error('No Cabs Available at the movement!');
      error.statusCode = 404;
      return next(error);
    }

    const cabDistance = [];
    const distantCab = cabs.map((a) => ({
      _id: a._id,
      baseCharges: a.baseCharges,
      distanceFromPassenger: getDistanceFromLatLonInKm(
        a.location.lati,
        a.location.longi,
        req.loggedInUser.location.lati,
        req.loggedInUser.location.longi
      ),
    }));

    const nearestCab = distantCab.sort((a, b) =>
      a.distanceFromPassenger > b.distanceFromPassenger ? 1 : 0
    )[0];

    await new domain.Booking({
      destination,
      noOfPassenger,
      totalAmount: nearestCab.baseCharges * noOfPassenger,
      user: req.loggedInUser._id,
      cab: nearestCab._id,
    }).save();

    const response = views.JsonView({ distance: cabDistance });
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @returns returns the distance between two
 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

/**
 *
 * @param {Number} deg latitude or longitude degree
 * @returns Retuns the radians from the degree
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
