const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

const randomStr = Math.random().toString(36).substring(2, 12);

exports.concatVideos = (originVideo, newVideo) => {
  return new Promise((resolve, reject) => {
    ffmpeg(originVideo)
      .input(newVideo)
      .setFfmpegPath(ffmpegPath)
      .setFfprobePath(ffprobePath)
      .on("error", (err) => {
        console.log(err);
        return;
      })
      .mergeToFile(`${randomStr}.mp4`, "/")
      .on("end", () => {
        console.log("Merging finished !");
        return resolve(`${randomStr}.mp4`);
      });
  });
};
