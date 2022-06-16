const express = require("express");
const authRouter = express.Router();
const { createUser } = require("../controllers/auth");

authRouter.post("/google", createUser);

module.exports = authRouter;
