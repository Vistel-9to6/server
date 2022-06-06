const Video = require("../models/Video");

exports.findVideoLists = async () => {
  return await Video.find().lean();
};
