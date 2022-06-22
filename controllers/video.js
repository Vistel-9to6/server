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

exports.getMyVideoList = async (req, res, next) => {
  const { id } = req.decoded;

  try {
    const user = await UserService.findUserByGoogleId({ userId: id });
    const videoList = await VideoService.findMyVideoList(user._id);

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
  const { video, thumbnail } = req.files;
  const { id } = req.decoded;

  if (!title || !maxCreators) {
    return res.status(400).json({
      result: "ng",
      errorMessage: "title or maxCreators value is required. try again.",
    });
  }

  try {
    const user = await UserService.findUserByGoogleId({ userId: id });

    await VideoService.createNewVideo({
      title,
      videoUrl: video[0].location,
      thumbnailUrl: thumbnail[0].location,
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
  const { videoUrl, filter } = req.body;

  try {
    const convertedGif = await convertGif(videoUrl, filter);
    const newGif = await uploadVideoToAWS(convertedGif, "gif");
    fs.unlinkSync(path.join(__dirname, `../${convertedGif}`));

    return res.status(201).json({
      result: "ok",
      file: newGif.Location,
    });
  } catch (err) {
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot create a video. try again.",
    });
  }
};
