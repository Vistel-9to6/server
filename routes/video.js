const express = require("express");
const videoRouter = express.Router();
const { getVideoList } = require("../controllers/video");

videoRouter.get("/", getVideoList);

module.exports = videoRouter;
