const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  loginCallback,
  loginSuccess,
  loginFailure,
} = require("../controllers/auth");

router.route("/").post(login);
router.route("/callback").get(loginCallback);
router.route("/logout").post(logout);
router.route("/success").get(loginSuccess);
router.route("/fail").get(loginFailure);

module.exports = router;
