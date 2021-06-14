const db = require('../db');
const express = require('express');
const { upload } = require("../services/ImageUpload");
const fileUpload = require('express-fileupload');
const { ensureLoggedIn } = require('../middlewear/auth');



const router = express.Router();

/** Uploads a new image for currently logged in user */
router.post('/', ensureLoggedIn, fileUpload(), upload, async (req, res, next) => {
    const url = res.locals.data.Location;
    const results = await db.query(`
        INSERT INTO images (creator, s3_url)
        VALUES ($1, $2)
        RETURNING s3_url
    `, [res.locals.user.username, url]);

    const image = results.rows[0];
    return res.json({ image });
});

/** GETs all public images */
router.get('/', async (req, res, next) => {
    const results = await db.query(`
        SELECT * FROM images
        WHERE NOT is_private
    `);
    const images = results.rows;
    return res.json({ images });
});

/** GETs public image by id - must be logged in */
router.get('/:id', ensureLoggedIn, async (req, res) => {
    const id = req.params.id;
    const results = await db.query(`
        SELECT * FROM images
        WHERE id = $1 
        AND NOT is_private
    `, [id]);
    if (results.rows.length === 0) {
        return res.json({ error: "private image or image does not exist" });
    }
    const image = results.rows[0];
    return res.json({ image });
});

module.exports = router;

