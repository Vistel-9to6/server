const Video = require("../models/Video");

exports.findVideoList = async () => {
  return await Video.find().lean();
};

exports.findVideoById = async (id) => {
  return await Video.findById(id).lean();
};
