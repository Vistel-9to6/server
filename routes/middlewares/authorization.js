const passport = require("passport");

exports.isLoggedIn = passport.authenticate("jwt", { session: false });
