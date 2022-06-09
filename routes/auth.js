const express = require("express");
const authRouter = express.Router();
const { createUser } = require("../controllers/auth");
const { checkAuthenticated } = require("../routes/middlewares/authentication");

authRouter.post("/login", checkAuthenticated, createUser);

module.exports = authRouter;
