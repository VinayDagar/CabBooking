module.exports = async function (next) {
  try {
    return Promise.resolve(this);
  } catch (err) {
    return next(err);
  }
};
