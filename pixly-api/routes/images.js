const db = require('../db');
const express = require('express');
const {upload} = require("../services/ImageUpload");
const { ensureLoggedIn } = require('../middlewear/auth');
const fileUpload = require('express-fileupload');
const exifr = require('exifr');


const router = express.Router();

router.post('/', ensureLoggedIn, fileUpload(), upload, async (req, res, next) => {
    // console.log(await exifr.parse(req.files.image.data, true))
    const url = res.locals.data.Location;
    const { username } = res.locals.user;
    const results = await db.query(`
        INSERT INTO images (location, camera, username, is_private, url)
        VALUES ($1, $2, $3, $4, $5 )
        RETURNING location, camera, username, is_private, url
    `, [null, null, username, false, url]);

    const image = results.rows[0];
    return res.json({ image });
});

module.exports = router;

