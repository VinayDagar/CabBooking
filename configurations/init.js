/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');

App.use(express.json());
App.use(express.static(path.join(__dirname, '..', 'public')));
App.use(bodyParser.json({ limit: '100mb' }));
App.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
App.use(helmet());
App.use(hpp());
App.use(cors());
App.use((req, res, next) => {
  Logger.info(`Route: ${req.url}`);
  next();
});

/**
 * @description Check if admin exist or not, if not create the Admin user.
 */
const createAdmin = async () => {
  try {
    const data = {
      name: process.env.ADMIN_FULL_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      phone: process.env.ADMIN_PHONE,
      role: 'shopAdmin',
      isEmailVerified: true,
      isPhoneVerified: true,
    };

    const admin = await domain.User.findOne({
      role: 'shopAdmin',
    });

    if (!admin) {
      await new domain.User(data).save();
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = () => {
  App.listen(process.env.PORT, () => {
    Logger.info(
      `Express server starting at port ${process.env.PORT}, in ${process.env.NODE_ENV} environment`
    );
    createAdmin();
  });
};
