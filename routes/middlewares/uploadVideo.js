const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-2",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  key(req, file, cb) {
    cb(null, `videos/${Date.now()}_${path.basename(file.originalname)}`);
  },
});

const uploadVideo = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  storage: s3VideoUploader,
});

module.exports = { s3, uploadVideo };
