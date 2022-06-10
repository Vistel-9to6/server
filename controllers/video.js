const VideoService = require("../services/VideoService");
const UserService = require("../services/UserService");

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
    return res.json({
      result: "ng",
      errorMessage: "cannot create a video. try again.",
    });
  }
};
