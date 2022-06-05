const passport = require("passport");

exports.login = passport.authenticate("google", {
  scope: ["profile"],
});

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();

    return res.status(200).json({ result: "ok", message: "Internal Error" });
  });
};

exports.loginCallback = (req, res, next) =>
  passport.authenticate("google", (err, user) => {
    if (err) {
      return res.status(500).json({ result: "ng", message: "Internal Error" });
    }

    if (!user) {
      return res.status(401).json({ result: "ng", message: "Unauthorized" });
    }

    return res.status(200).json({ result: "ok", message: "login success" });
  })(req, res, next);
