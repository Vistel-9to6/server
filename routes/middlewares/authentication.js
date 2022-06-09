const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.checkAuthenticated = async (req, res, next) => {
  const { token } = req.body;

  try {
    const decoded = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    if (!decoded.exp) {
      return res.status(401).json({
        results: "ok",
        errorMessage: "token is expired. try to login again.",
      });
    }

    const payload = decoded.getPayload();
    const user = {
      userId: payload.sub,
      profilePhoto: payload.photo,
    };

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      result: "ng",
      errorMessage: "unAuthorized",
    });
  }
};
