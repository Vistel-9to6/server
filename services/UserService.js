const User = require("../models/User");

exports.findUserById = async (objectId) => {
  return await User.findById(objectId).lean();
};

exports.findUserByGoogleId = async (query) => {
  return await User.findOne(query).lean();
};

exports.createNewUser = async (data) => {
  return await User.create(data);
};
