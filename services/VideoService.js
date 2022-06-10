const Video = require("../models/Video");

exports.findVideoList = async () => {
  return await Video.find().lean();
};

exports.createNewVideo = async (data) => {
  return await Video.create(data);
};
