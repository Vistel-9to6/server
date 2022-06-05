const express = require("express");
const router = express.Router();
const { login, logout, loginCallback } = require("../controllers/auth");

router.route("/").get(login);

router.route("/callback").get(loginCallback);

router.route("/logout").get(logout);

module.exports = router;
