const { v1 } = require('uuid');

module.exports = function (next) {
  try {
    this.salt = v1();
    // eslint-disable-next-line no-undef
    this.password = configHolder.encryptUtility.createHash(
      this.password,
      this.salt
    );

    return Promise.resolve(this);
  } catch (err) {
    return next(err);
  }
};
