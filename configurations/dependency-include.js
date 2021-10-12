/* eslint-disable no-undef */
/*
 * Requirement - include all the global variables and module required by the application
 */
const mongoose = require('mongoose');

global.requireDirectory = require('../utilities/require-directory');
global.Logger = require('../utilities/logger-utility');
global.Joi = require('joi');

global.configHolder = {};

global.Mongoose = mongoose;
global.MongooseConnect = require('./datasource.js')();
global.MongooseSchema = mongoose.Schema;
global.ObjectId = mongoose.Schema.Types.ObjectId;

global.views = require('../application/views');
global.domain = require('../db/models');

configHolder.jwtUtility = require('../utilities/jwt-utility');
configHolder.encryptUtility = require('../utilities/encrypt-utility');

module.exports = configHolder;
