const express = require("express");
const videoRouter = express.Router();
const {
  getVideoList,
  createVideo,
  updateVideo,
} = require("../controllers/video");
const { uploadVideo } = require("../routes/middlewares/uploadVideo");
const { isLoggedIn } = require("./middlewares/authorization");

videoRouter.get("/", getVideoList);
videoRouter.post("/", uploadVideo.single("video"), createVideo);
videoRouter.patch("/", uploadVideo.single("video"), updateVideo);

module.exports = videoRouter;
