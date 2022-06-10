const VideoService = require("../services/VideoService");

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
  const { file } = req;
  console.log("back");
  console.log(req.file); // RN에서 body.append 안에 넣은 이름으로 받아옴

  const { title, dueDate, userId } = result;

  try {
    await VideoService.createNewVideo({
      title: title,
      videoUrl:
        process.env.NODE_ENV === "development" ? file.path : file.location,
      creators: ["23dwefwl2efdf"],
      dueDate: "2022-05-01",
    });

    return res.status(201).json({
      result: "ok",
    });
  } catch (err) {
    console.log("에러");
    return res.status(500).json({
      result: "ng",
      errorMessage: "cannot create a video. try again.",
    });
  }
};
