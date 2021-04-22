const db = require('../db');
const express = require('express');
const { upload } = require("../services/ImageUpload");
const { ensureLoggedIn } = require('../middlewear/auth');
const fileUpload = require('express-fileupload');
// const exifr = require('exifr');


const router = express.Router();

//upload new image
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

//get all public images
router.get('/', async (req, res, next) => {
    const results = await db.query(`
        SELECT * FROM images
        WHERE is_private = false
    `);
    const images = results.rows;
    return res.json({ images });
});

//get public image by id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const results = await db.query(`
        SELECT * FROM images
        WHERE is_private = false and
        id = $1
    `, [id]);
    if (results.rows.length === 0) {
        return res.json({ error: "private image or image does not exist" });
    }
    const image = results.rows[0];
    return res.json({ image });
});

module.exports = router;

