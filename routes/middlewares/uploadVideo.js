const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-2",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "vistel-videos",
  acl: "public-read",
  key(req, file, cb) {
    cb(null, `videos/${Date.now()}_${path.basename(file.originalname)}`);
  },
});

exports.uploadVideo = multer({
  dest: "uploads/",
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  storage: s3VideoUploader,
});
