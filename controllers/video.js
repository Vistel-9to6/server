const VideoService = require("../services/VideoService");

exports.getVideoLists = async (req, res, next) => {
  try {
    const videoLists = await VideoService.findVideoLists();

    return res.status(201).json({
      result: "ok",
      data: videoLists,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot get all videos. try again.",
    });
  }
};
