/* eslint-disable no-undef */
/**
 @author: Vinay Dagar
 configuration is define to make connection with the database for the different environment.
*/
const dotenv = require('dotenv');

/**
 *
 * @param {Object} db   postgres database instance
 * @description         tries to authenticate DB, if not then throw error
 */
module.exports = () => {
  // Set the configurations of environment files.
  dotenv.config({
    path: `${__dirname}/../env/${process.env.NODE_ENV}.env`,
  });

  const options = {
    useNewUrlParser: true,
    socketTimeoutMS: 10000,
    useUnifiedTopology: true,
  };
  const URL = process.env.DATABASE_URL;

  Mongoose.connect(URL, options);

  if (process.env.ENABLE_DB_LOG) {
    Mongoose.set('debug', true);
  }

  const db = Mongoose.connection;

  db.on('error', (err) => {
    Logger.error(err);
  });

  db.on('open', () => {
    Logger.info('Database connected!');
  });

  return db;
};
