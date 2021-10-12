module.exports = async function ({ email, phone }) {
  // eslint-disable-next-line no-undef
  return domain.User.findOne({
    email,
    phone,
  });
};
