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
  let ext = req.files.image.name.split('.')[1];
  const params = {
    ACL: 'public-read',
    Bucket: process.env.BUCKET_NAME,
    Body: req.files.image.data,
    Key: uuidv4() + '.' + ext
  };
  
  s3.upload(params, (err, data) => {
    if(err) return next(err)
    res.locals.data = data;
    return next();
  })
}

module.exports = {upload};
