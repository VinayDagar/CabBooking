const domain = require('../db/models');

/* eslint-disable no-undef */
exports.getBookingHistory = async (req, res, next) => {
  try {
    const bookings = await domain.Booking.find({
      user: req.loggedInUser._id,
    });

    // await domain.Project.create({
    //   id: configHolder.generateUniqueId(),
    //   projectName,
    //   view,
    //   createdBy: req.loggedInUser.id,
    // });

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
      'location _id'
    );

    if (!cabs || !cabs.length) {
      const error = new Error('No Cabs Available at the movement!');
      error.statusCode = 404;
      return next(error);
    }

    const cabDistance = [];
    for (const cab of cabs) {
      cabDistance.push(
        getDistanceFromLatLonInKm(
          cab.location.lati,
          cab.location.longi,
          req.loggedInUser.lati,
          req.loggedInUser.longi
        )
      );
    }

    const response = views.JsonView({ distance: cabDistance });
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {number} latitude1
 * @param {number} longitude1
 * @param {number} latitude2
 * @param {number} longitude2
 * @param {number} units
 * @returns returns the distance between two
 */
function getDistanceFromLatLonInKm(
  latitude1,
  longitude1,
  latitude2,
  longitude2
) {
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = deg2rad(latitude2 - latitude1); // deg2rad below
  const dLon = deg2rad(longitude2 - longitude1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(latitude1)) *
      Math.cos(deg2rad(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

/**
 *
 * @param {Number} degrees latitude or longitude degree
 * @returns Retuns the radians from the degree
 */
function deg2rad(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
