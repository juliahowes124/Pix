const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config()

///THIS HAS TO BE CONFIGURED BEFORE AWS INSTANTIATION
aws.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: "private",
    s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  })
});

module.exports = upload;
   