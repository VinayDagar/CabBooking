const { Router } = require('express');
const { validate } = require('express-validation');
// Controllers
const {
  registerController,
  loginController,
} = require('../../controllers/authentication');

const {
  getBookingHistory,
  bookNearByCab,
} = require('../../controllers/common');

// middlewares
const validationSchema = require('../../application/validations');
const { canAccess } = require('../../application/middlewares/access');
const authenticated = require('../../application/middlewares/authentication');

const router = Router();

router
  .post(
    '/register/:role',
    // validate(validationSchema.signupValidation, {}, {}),
    canAccess(['anonymous']),
    registerController
  )
  .post(
    '/login',
    validate(validationSchema.loginValidation, {}, {}),
    canAccess(['anonymous']),
    loginController
  )
  .post('book-cab', authenticated, canAccess(['user']), bookNearByCab)
  .get(
    'booking-history',
    authenticated,
    canAccess(['user']),
    getBookingHistory
  );

module.exports = router;
