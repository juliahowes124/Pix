const db = require('../db');
const express = require('express');
const upload = require("../services/ImageUpload");


const router = express.Router();

router.post('/', upload.single('image'), async (req, res, next) => {
    const url = req.file.location;
    const {username} = req.body;
    const results = await db.query(`
        INSERT INTO images (location, camera, username, is_private, url)
        VALUES ($1, $2, $3, $4, $5 )

    `)
    console.log(req.file);
    return res.json({msg: "something happened"})
})

module.exports = router;

