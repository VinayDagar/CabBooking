module.exports = async function (id, data) {
  try {
    // eslint-disable-next-line no-undef
    return await domain.User.findOneAndUpdate(
      {
        _id: id,
      },
      data
    );
  } catch (err) {
    return Promise.reject(err);
  }
};
