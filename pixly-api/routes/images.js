const db = require('../db');
const express = require('express');
const upload = require("../services/ImageUpload");


const router = express.Router();

router.post('/', upload.single('image'), async (req, res, next) => {
    console.log(req.file);
    return res.json({msg: "something happened"})
})

module.exports = router;

