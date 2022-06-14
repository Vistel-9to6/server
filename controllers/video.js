const path = require("path");
const fs = require("fs");
const VideoService = require("../services/VideoService");
const UserService = require("../services/UserService");
const { concatVideos, convertGif } = require("../services/FFmpegService");
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
  const { id } = req.decoded;

  try {
    const user = await UserService.findUserByGoogleId({ userId: id });

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
  const { id } = req.decoded;

  try {
    const concatedVideo = await concatVideos(originVideoUrl, file.location);

    if (concatedVideo.result === "ng") {
      return res.status(500).json({
        result: "ng",
        errorMessage: "cannot update a video. try again.",
      });
    }

    const newVideo = await uploadVideoToAWS(concatedVideo, "mp4");
    fs.unlinkSync(path.join(__dirname, `../${concatedVideo}`));

    if (newVideo.result === "ng") {
      return res.status(500).json({
        result: "ng",
        errorMessage: "cannot update a video. try again.",
      });
    }

    const user = await UserService.findUserByGoogleId({ userId: id });
    await VideoService.updateVideoDetails(
      originVideoUrl,
      newVideo.Location,
      user._id,
    );

    res.status(201).json({
      result: "ok",
    });

    await deleteFile(originVideoUrl);
    await deleteFile(file.location);
    return;
  } catch (err) {
    return res.status(500).json({
      result: "server error",
      errorMessage: "cannot update a video. try again.",
    });
  }
};

exports.createGif = async (req, res, next) => {
  const { videoUrl, fps } = req.body;

  try {
    const convertedGif = await convertGif(videoUrl, fps);
    const newGif = await uploadVideoToAWS(convertedGif, "gif");
    fs.unlinkSync(path.join(__dirname, `../${convertedGif}`));

    return res.status(201).json({
      result: "ok",
      file: newGif.Location,
    });
  } catch (err) {
    return res.status(500).json({
      result: "CreateGif ng",
      errorMessage: "cannot create a video. try again.",
    });
  }
};
