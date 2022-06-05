const User = require("../models/User");

exports.findUserById = async (objectId) => {
  return await User.findById(objectId).lean();
};

exports.findUserBygoogleId = async (query) => {
  return await User.findOne(query).lean();
};

exports.creatNewUser = async (data) => {
  return await User.create(data).lean();
};
