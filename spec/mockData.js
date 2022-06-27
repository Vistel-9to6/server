require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const mockUserObjectId = "62b2b6bd6b69a5a5c74f03a6";
const mockVideoObjectId = "62ad74c3117fe3b755602827";

const mockUser = {
  _id: mongoose.Types.ObjectId(mockUserObjectId),
  userId: "111978426785433578466",
  profilePhoto:
    "https://lh3.googleusercontent.com/a/AATXAJwPAoEWnY2z5FI4mrHavEKKqnfWhicrth5XGtzT=s96-c",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockToken = jwt.sign(
  { id: mockUser.userId, profilePhoto: mockUser.profilePhoto },
  process.env.JWT_SECRET,
);

const mockVideo = {
  _id: mongoose.Types.ObjectId(mockVideoObjectId),
  title: "newVideo",
  videoUrl:
    "https://vistel-videos.s3.ap-northeast-2.amazonaws.com/videos/1655534809204_zlab6mftmc.mp4",
  thumbnailUrl:
    "https://vistel-videos.s3.ap-northeast-2.amazonaws.com/thumbnails/1655534786913_7y066r18gu.jpg",
  creators: [mongoose.Types.ObjectId(mockUserObjectId)],
  maxCreators: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  mockUserObjectId,
  mockUser,
  mockToken,
  mockVideoObjectId,
  mockVideo,
};
