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

exports.convertGif = (originVideo, filter) => {
  const { color, grid, fps = 15 } = filter;
  const filename = `${now}_${randomStr}.gif`;

  const getGifOption = (color, grid) => {
    if (!color && !grid) {
      return "";
    }

    if (!color) {
      if (grid === "2x2") {
        return gifFilterOptions.GRID_2;
      }

      if (grid === "3x3") {
        return gifFilterOptions.GRID_3;
      }

      if (grid === "4x4") {
        return gifFilterOptions.GRID_4;
      }
    }

    if (color === "SEPIA") {
      if (!grid) {
        return gifFilterOptions.SEPIA;
      }

      if (grid === "2x2") {
        return gifFilterOptions.GRID_2_SEPIA;
      }

      if (grid === "3x3") {
        return gifFilterOptions.GRID_3_SEPIA;
      }

      if (grid === "4x4") {
        return gifFilterOptions.GRID_4_SEPIA;
      }
    }

    if (color === "GRAYSCALE") {
      if (!grid) {
        return gifFilterOptions.GRAYSCALE;
      }

      if (grid === "2x2") {
        return gifFilterOptions.GRID_2_GRAYSCALE;
      }

      if (grid === "3x3") {
        return gifFilterOptions.GRID_3_GRAYSCALE;
      }

      if (grid === "4x4") {
        return gifFilterOptions.GRID_4_GRAYSCALE;
      }
    }

    if (color === "REVERSAL") {
      if (!grid) {
        return gifFilterOptions.REVERSAL;
      }

      if (grid === "2x2") {
        return gifFilterOptions.GRID_2_REVERSAL;
      }

      if (grid === "3x3") {
        return gifFilterOptions.GRID_3_REVERSAL;
      }

      if (grid === "4x4") {
        return gifFilterOptions.GRID_4_REVERSAL;
      }
    }
  };

  return new Promise((resolve, reject) => {
    ffmpeg(originVideo)
      .complexFilter(getGifOption(color, grid))
      .fps(fps)
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
