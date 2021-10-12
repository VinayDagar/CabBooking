/* eslint-disable no-undef */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const { ValidationError } = require('express-validation');

const app = express();
global.App = app;

global.configHolder = require('./configurations/dependency-include');

require('./configurations/init')();

const commonRoutes = require('./configurations/routes/common');

app.use('/api/v1/common', commonRoutes);

app.get('/', (req, res) => res.status(200).send('Server is running'));

app.use((error, req, res, next) => {
  Logger.error('Error ', { error });

  if (error instanceof ValidationError) {
    error = views.ErrorView({
      status: error.statusCode,
      message: error.details.body[0].message,
    });
    return res.status(error.status).json(error);
  }

  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  error = views.ErrorView({ status, message });
  return res.status(error.status).json(error);
});
