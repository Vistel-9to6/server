const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "아이디는 필수 입력 사항입니다."],
    },
    profilePhoto: {
      type: String,
    },
    lastVisited: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
