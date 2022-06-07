const express = require("express");
const videoRouter = express.Router();
const { getVideoList, getVideo } = require("../controllers/video");

videoRouter.get("/", getVideoList).get("/:id", getVideo);

module.exports = videoRouter;
