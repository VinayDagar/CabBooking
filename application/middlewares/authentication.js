/* eslint-disable no-undef */
module.exports = async (req, res, next) => {
  try {
    let token = req.get('x-access-token');

    if (!token) {
      const err = new Error('Unauthorized. Token not found!');
      err.statusCode = 401;
      return next(err);
    }

    token = token.split(' ')[1];

    if (!token) {
      const err = new Error('ACCESS-TOKEN is not formated properly!');
      err.statusCode = 401;
      return next(err);
    }

    const { userId, type } = configHolder.jwtUtility.verifyToken(
      token,
      process.env.APP_SECRET_KEY
    );

    if (!userId) {
      const err = new Error('Unauthorized.');
      err.statusCode = 401;
      return next(err);
    }

    const user = await domain.User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new Error('Unauthorised. user not found!');
      error.statusCode = 401;
      return next(error);
    }

    if (user.isAccountLocked) {
      const error = new Error(
        'Your account is locked. Please contact support!'
      );
      error.statusCode = 401;
      return next(error);
    }
    req.loggedInUser = user;

    if (user.role === 'client_user') {
      const clientUser = await domain.ClientProfile.findOne({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: domain.Client,
            attribute: ['id', 'userId'],
          },
        ],
      });
      req.loggedInUser.clientId = clientUser.Client.id;
      req.loggedInUser.dataValues.clientId = clientUser.Client.id;

      req.loggedInUser.clientUserId = clientUser.Client.userId;
      req.loggedInUser.dataValues.clientUserId = clientUser.Client.userId;
    }

    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
