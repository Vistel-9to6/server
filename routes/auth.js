const express = require("express");
const authRouter = express.Router();
const {
  login,
  logout,
  loginCallback,
  loginSuccess,
  loginFailure,
} = require("../controllers/auth");

authRouter
  .get("/login", login)
  .get("/callback", loginCallback)
  .get("/logout", logout)
  .get("/success", loginSuccess)
  .get("/fail", loginFailure);

module.exports = authRouter;
