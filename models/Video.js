const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title not specified"],
    },
    videoUrl: {
      type: String,
      required: [true, "videoUrl not specified"],
    },
    creators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    maxCreators: {
      type: Number,
      max: [5, "max value is 5"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Video", VideoSchema);
