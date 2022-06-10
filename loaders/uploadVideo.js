const path = require("path");
const fs = require("fs");
const { Upload } = require("@aws-sdk/lib-storage");
const { s3 } = require("./routes/middlewares/uploadVideo");
const { concatVideos } = require("./concatVideos");

const randomStr = Math.random().toString(36).substring(2, 12);

const uploadVideoToAWS = async (stream) => {
  console.log(stream);
  try {
    const data = fs.readFileSync(path.join(__dirname, stream));
    const parallelUploads3 = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `videos/${Date.now()}_${randomStr}.mp4`,
        Body: data,
      },
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log("progress", progress);
    });

    return await parallelUploads3.done();
  } catch (e) {
    console.log(e);
  }
};

exports.concatAndSaveVideo = async (originVideo, newVideo) => {
  const result = await concatVideos(originVideo, newVideo);
  const save = await uploadVideoToAWS(result);

  fs.unlinkSync(path.join(__dirname, result));

  return save;
};
