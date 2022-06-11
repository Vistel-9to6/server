const path = require("path");
const fs = require("fs");
const VideoService = require("../services/VideoService");
const UserService = require("../services/UserService");
const { concatVideos } = require("../services/FFmpegService");
const { uploadVideoToAWS, deleteFile } = require("../services/AWSService");

exports.getVideoList = async (req, res, next) => {
  try {
    const videoList = await VideoService.findVideoList();
    return res.status(200).json({
      result: "ok",
      videoList,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot get all videos. try again.",
    });
  }
};

exports.createVideo = async (req, res, next) => {
  const { title, maxCreators } = req.body;
  const { file } = req;
  const { userId } = req.user;

  const user = await UserService.findUserBygoogleId({ userId });

  try {
    await VideoService.createNewVideo({
      title,
      videoUrl: file.location,
      creators: [user._id],
      maxCreators,
    });

    return res.status(201).json({
      result: "ok",
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot create a video. try again.",
    });
  }
};

exports.updateVideo = async (req, res, next) => {
  const { originVideoUrl } = req.body;
  const { file } = req;
  const { userId } = req.user;

  try {
    const concatedVideo = await concatVideos(originVideoUrl, file.location);

    if (concatedVideo.result === "ng") {
      return res.status(500).json({
        result: "ng",
        errorMessage: "cannot update a video. try again.",
      });
    }

    const newVideo = await uploadVideoToAWS(concatedVideo);
    fs.unlinkSync(path.join(__dirname, newVideo));

    if (newVideo.result === "ng") {
      return res.status(500).json({
        result: "ng",
        errorMessage: "cannot update a video. try again.",
      });
    }

    const user = await UserService.findUserBygoogleId({ userId });
    await VideoService.updateVideoDetails(
      originVideoUrl,
      newVideo.Location,
      user._id,
    );

    res.status(201).json({
      result: "ok",
    });

    deleteFile(originVideoUrl);
    deleteFile(file.location);
    return;
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot update a video. try again.",
    });
  }
};
