const VideoService = require("../services/VideoService");

exports.getVideoList = async (req, res, next) => {
  try {
    const videoList = await VideoService.findVideoList();

    return res.status(200).json({
      result: "ok",
      videos: videoList,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot get all videos. try again.",
    });
  }
};

exports.getVideo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const video = await VideoService.findVideoById(id);

    return res.status(200).json({
      result: "ok",
      video: video,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot get a video. try again.",
    });
  }
};
