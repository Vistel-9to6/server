const User = require("../Models/User");

exports.findUserByUserId = async (userId) => {
  return await User.findOne({ userId }).lean();
};

exports.createNewUser = async (data) => {
  return await User.create(data);
};
