const UserService = require("../services/UserService");

exports.login = async (req, res, next) => {
  const { user } = req.body;

  try {
    const existUser = await UserService.findUserQuery(user.uid);

    if (!existUser) {
      await UserService.creatNewUser({
        userId: user.uid,
        profilePhoto: user.photoURL,
      });
    }

    return res.status(200).json({
      result: "ok",
    });
  } catch (err) {
    return res.status(401).json({
      result: "ng",
      errorMessage: "Unauthorized",
    });
  }
};
