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
    thumbUrl: {
      type: String,
      required: [true, "thumbUrl not specified"],
    },
    creators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Video", VideoSchema);
