const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const gifFilterOptions = require("../constants/gif-filter-options");
const randomStr = Math.random().toString(36).substring(2, 12);
const now = Date.now();

exports.concatVideos = (originVideo, newVideo) => {
  return new Promise((resolve, reject) => {
    ffmpeg(originVideo)
      .input(newVideo)
      .fps(24)
      .on("error", (err) => {
        return {
          result: "ng",
          errorMessage: "cannot merge videos",
        };
      })
      .videoCodec("libx264")
      .mergeToFile(`${now}_${randomStr}.mp4`, "/")
      .on("end", () => {
        return resolve(`${now}_${randomStr}.mp4`);
      });
  });
};

exports.convertGif = (originVideo, filter) => {
  const { color, grid, fps } = filter;
  const filename = `${now}_${randomStr}.gif`;

  const getOption = (color, grid) =>
    gifFilterOptions[`OPTION_${grid[0]}_${color}`];
  const type = getOption(color, grid);

  if (type) {
    return new Promise((resolve, reject) => {
      ffmpeg(originVideo)
        .complexFilter(type)
        .fps(fps ? fps : 15)
        .output(`./${filename}`)
        .on("end", (err) => {
          if (!err) {
            console.log("conversion Done");
          }

          return resolve(filename);
        })
        .run();
    });
  }

  return new Promise((resolve, reject) => {
    ffmpeg(originVideo)
      .fps(fps ? fps : 15)
      .output(`./${filename}`)
      .on("end", (err) => {
        if (!err) {
          console.log("conversion Done");
        }

        return resolve(filename);
      })
      .run();
  });
};
