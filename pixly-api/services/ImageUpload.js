const aws = require('aws-sdk');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

///THIS HAS TO BE CONFIGURED BEFORE AWS INSTANTIATION
aws.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION
});

const s3 = new aws.S3();


function upload(req, res, next) {
  console.log('IN FILE UPLOAD SERVICE')
  let ext = req.files.image.name.split('.')[1]
  const params = {
    ACL: 'public-read',
    Bucket: process.env.BUCKET_NAME,
    Body: req.files.image.data,
    Key: uuidv4() + '.' + ext
  };
  
  s3.upload(params, (err, data) => {
    res.locals.data = data;
    return next();
  })
}


// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     return next()
//   } else {
//     throw new Error("Invalid file type, only JPEG and PNG is allowed!");
//   }
// };

module.exports = {upload};
