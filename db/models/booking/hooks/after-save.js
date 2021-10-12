module.exports = async function (next) {
  try {
    // eslint-disable-next-line no-undef
    await domain.Cab.findOneAndUpdate(
      {
        _id: this.cab,
      },
      {
        isBooked: true,
      }
    );
    return Promise.resolve(this);
  } catch (err) {
    return next(err);
  }
};
