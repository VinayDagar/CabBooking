module.exports = async (email) => {
  // eslint-disable-next-line no-undef
  const user = await domain.User.findOne({
    email,
  });

  return user;
};
