const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required."],
    },
    profilePhoto: {
      type: String,
      required: [true, "profilePhoto is required."],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
