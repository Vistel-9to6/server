const UserService = require("../services/UserService");

exports.createUser = async (req, res, next) => {
  const { userId, profilePhoto } = req.user;

  try {
    const user = await UserService.findUserByUserId(userId);

    if (user) {
      return res.status(200).json({
        result: "ok",
        user,
      });
    }

    const newUser = await UserService.createNewUser({
      userId,
      profilePhoto,
    });

    return res.status(201).json({
      result: "ok",
      user: newUser,
    });
  } catch (err) {
    return res.json({
      result: "ng",
      errorMessage: "cannot create a user. try again.",
    });
  }
};
