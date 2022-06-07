const User = require("../models/User");

exports.findUserById = async (objectId) => {
  return await User.findById(objectId).lean();
};

exports.findUserQuery = async (query) => {
  return await User.findOne({ userId: query }).lean();
};

exports.creatNewUser = async (data) => {
  return await User.create(data);
};
