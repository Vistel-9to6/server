const passport = require("passport");

exports.login = passport.authenticate("google", {
  scope: ["profile"],
});

exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(400)
        .json({ result: "ng", errorMessage: "logout failure" });
    }

    return res.status(200).json({ result: "ok" });
  });
};

exports.loginCallback = passport.authenticate("google", {
  successRedirect: "/api/auth/success",
  failureRedirect: "/api/auth/fail",
});

exports.loginFailure = (req, res, next) => {
  return res.status(401).json({
    result: "ng",
    errorMessage: "Unauthorized",
  });
};

exports.loginSuccess = (req, res, next) => {
  return res.status(200).json({
    result: "ok",
    user: req.user,
  });
};
