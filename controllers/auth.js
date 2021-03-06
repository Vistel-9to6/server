const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.EXPO_CLIENT_ID);

exports.createUser = async (req, res, next) => {
  const { token } = req.body;
  let decoded;

  try {
    decoded = await client.verifyIdToken({
      idToken: token,
      audience: process.env.EXPO_CLIENT_ID,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "internal server error",
    });
  }

  if (!decoded) {
    return res.status(401).json({
      result: "ng",
      errorMessage: "unauthorized",
    });
  }

  const { sub: userId, picture: profilePhoto } = decoded.payload;

  try {
    let user = await UserService.findUserByGoogleId({ userId });

    if (!user) {
      user = await UserService.createNewUser({ userId, profilePhoto });
    }

    const token = jwt.sign(
      { id: userId, profilePhoto },
      process.env.JWT_SECRET,
    );

    return res.json({ userId, profilePhoto, token });
  } catch (err) {
    return res.json({
      result: "ng",
      errorMessage: "cannot create a user. try again.",
    });
  }
};
