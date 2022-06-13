const Video = require("../models/Video");

exports.findVideoList = async () => {
  return await Video.find().lean();
};

exports.createNewVideo = async (data) => {
  return await Video.create(data);
};

exports.updateVideoDetails = async (originVideoUrl, newVideoUrl, user) => {
  return await Video.findOneAndUpdate(
    { videoUrl: originVideoUrl },
    {
      $push: { creators: user },
      $set: { videoUrl: newVideoUrl },
    },
  );
};
