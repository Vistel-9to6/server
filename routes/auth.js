const express = require("express");
const authRouter = express.Router();
const { createUser } = require("../controllers/auth");

authRouter.post("/login", createUser);

module.exports = authRouter;
