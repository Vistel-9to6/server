const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const randomStr = Math.random().toString(36).substring(2, 12);

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
    if (file.fieldname === "thumbnail") {
      cb(null, `thumbnails/${Date.now()}_${randomStr}.jpg`);
    } else {
      cb(null, `videos/${Date.now()}_${randomStr}.mp4`);
    }
  },
});

const uploadVideoWithMulter = multer({
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  storage: s3VideoUploader,
});

module.exports = { s3, uploadVideoWithMulter };
