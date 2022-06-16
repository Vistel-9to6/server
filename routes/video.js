const express = require("express");
const videoRouter = express.Router();
const {
  getVideoList,
  getMyVideoList,
  createVideo,
  updateVideo,
  createGif,
} = require("../controllers/video");
const { uploadVideoWithMulter } = require("../routes/middlewares/uploadToAWS");
const { isLoggedIn } = require("./middlewares/authorization");

videoRouter
  .get("/", getVideoList)
  .get("/:userId", isLoggedIn, getMyVideoList)
  .post("/gif", isLoggedIn, createGif)
  .post(
    "/",
    isLoggedIn,
    uploadVideoWithMulter.fields([{ name: "video" }, { name: "thumbnail" }]),
    createVideo,
  )
  .patch("/", isLoggedIn, uploadVideoWithMulter.single("video"), updateVideo);

module.exports = videoRouter;
