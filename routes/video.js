const express = require("express");
const videoRouter = express.Router();
const {
  getVideoList,
  createVideo,
  updateVideo,
} = require("../controllers/video");
const { uploadVideoToAWS } = require("../routes/middlewares/uploadToAWS");
const { isLoggedIn } = require("./middlewares/authorization");

videoRouter.get("/", getVideoList);
videoRouter.post(
  "/",
  isLoggedIn,
  uploadVideoToAWS.single("video"),
  createVideo,
);
videoRouter.patch(
  "/",
  isLoggedIn,
  uploadVideoToAWS.single("video"),
  updateVideo,
);

module.exports = videoRouter;
