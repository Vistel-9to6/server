const express = require("express");
const videoRouter = express.Router();
const { getVideoLists } = require("../controllers/video");

videoRouter.get("/", getVideoLists);

module.exports = videoRouter;
