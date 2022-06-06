const Video = require("../models/Video");

exports.findVideoList = async () => {
  return await Video.find().lean();
};
