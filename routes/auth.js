const express = require("express");
const router = express.Router();

router.route("/")
  .get(login);

router.route("/callback")
  .get(loginCallback);

router.route("/logout")
  .get(logout);

module.exports = router;
