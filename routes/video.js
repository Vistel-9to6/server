const express = require("express");
const videoRouter = express.Router();
const {
  getVideoList,
  createVideo,
  updateVideo,
  createGif,
} = require("../controllers/video");
const { uploadVideoWithMulter } = require("../routes/middlewares/uploadToAWS");
const { isLoggedIn } = require("./middlewares/authorization");

videoRouter
  .get("/", getVideoList)
  .post("/gif", isLoggedIn, createGif)
  .post("/", isLoggedIn, uploadVideoWithMulter.single("video"), createVideo)
  .patch("/", isLoggedIn, uploadVideoWithMulter.single("video"), updateVideo);

module.exports = videoRouter;
