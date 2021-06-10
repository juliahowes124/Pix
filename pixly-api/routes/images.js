const db = require('../db');
const express = require('express');
const { upload } = require("../services/ImageUpload");
const { ensureLoggedIn } = require('../middlewear/auth');
const fileUpload = require('express-fileupload');


const router = express.Router();

//upload new image
router.post('/', ensureLoggedIn, fileUpload(), upload, async (req, res, next) => {
    console.log('IN ENDPOINT', res.locals.data)
    const url = res.locals.data.Location;
    const results = await db.query(`
        INSERT INTO images (album_id, s3_url)
        VALUES ($1, $2)
        RETURNING album_id, s3_url
    `, [1, url]);

    const image = results.rows[0];
    return res.json({ image });
});

//get all public images
router.get('/', async (req, res, next) => {
    const results = await db.query(`
        SELECT * FROM images
    `);
    const images = results.rows;
    return res.json({ images });
});

//get public image by id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const results = await db.query(`
        SELECT * FROM images
        WHERE id = $1
    `, [id]);
    if (results.rows.length === 0) {
        return res.json({ error: "private image or image does not exist" });
    }
    const image = results.rows[0];
    return res.json({ image });
});

module.exports = router;

