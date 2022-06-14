const path = require("path");
const fs = require("fs");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-2",
});

const randomStr = Math.random().toString(36).substring(2, 12);

exports.uploadVideoToAWS = async (stream, ext) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, `../${stream}`));

    const parallelUploads3 = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `videos/${Date.now()}_${randomStr}.${ext}`,
        Body: data,
      },
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log("progress", progress);
    });

    return await parallelUploads3.done();
  } catch (error) {
    return {
      result: "uploadVideoToAWS ng",
      errorMessage: "cannot upload a video",
    };
  }
};

exports.deleteFile = async (filename) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `videos/${filename}`,
      }),
    );

    return { result: "ok" };
  } catch (error) {
    return { result: "deleteFile ng", errorMessage: "cannot delete a video" };
  }
};
