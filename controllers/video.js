const VideoService = require("../services/VideoService");

exports.getVideoList = async (req, res, next) => {
  try {
    const videoLists = await VideoService.findVideoList();

    return res.status(201).json({
      result: "ok",
      videos: videoLists,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot get all videos. try again.",
    });
  }
};
