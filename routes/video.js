const express = require("express");
const videoRouter = express.Router();
const { getVideoList, createVideo } = require("../controllers/video");
const { uploadVideo } = require("../routes/middlewares/uploadVideo");

videoRouter.get("/", getVideoList);
videoRouter.post(
  "/",
  uploadVideo.single("video"),
  createVideo,
);

module.exports = videoRouter;
