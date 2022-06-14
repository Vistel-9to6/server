const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const randomStr = Math.random().toString(36).substring(2, 12);
const now = Date.now();

exports.concatVideos = (originVideo, newVideo) => {
  return new Promise((resolve, reject) => {
    ffmpeg(originVideo)
      .input(newVideo)
      .on("error", (err) => {
        return {
          result: "ng",
          errorMessage: "cannot merge videos",
        };
      })
      .mergeToFile(`${now}_${randomStr}.mp4`, "/")
      .on("end", () => {
        return resolve(`${now}_${randomStr}.mp4`);
      });
  });
};

exports.convertGif = (originVideo, fps) => {
  const filename = `${Date.now()}_${randomStr}.gif`;

  return new Promise((resolve, reject) => {
    ffmpeg(originVideo)
      .size("360x640")
      .fps(fps)
      .output(`./${filename}`)
      .on("error", (err) => {
        console.log("error: ", err);
      })
      .on("end", (err) => {
        if (!err) {
          console.log("conversion Done");
        }

        return resolve(filename);
      })
      .run();
  });
};
