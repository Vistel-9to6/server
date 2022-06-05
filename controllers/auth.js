const passport = require("passport");

exports.login = passport.authenticate("google", {
  scope: ["profile"],
});

exports.logout = (req, res, next) => {
  req.logout();

  return res.status(200).json({ result: "ok", message: "logout success" });
};

exports.loginCallback = passport.authenticate("google", {
  successRedirect: "/api/auth/success",
  failureRedirect: "/api/auth/fail",
});

exports.loginFailure = (req, res, next) => {
  return res.ststua(401).json({
    result: "ng",
    message: "Unauthorized",
  });
};

exports.loginSuccess = (req, res, next) => {
  return res.ststua(200).json({
    result: "ok",
    message: "login success",
    user: req.user,
  });
};
