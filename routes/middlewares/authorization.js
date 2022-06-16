const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        result: "ng",
        errorMessage: "Unauthorized",
      });
    }

    req.decoded = jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (err) {
    return res.status(403).json({
      result: "ng",
      errorMessage: "forbidden",
    });
  }
};
