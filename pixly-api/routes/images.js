const db = require('../db');
const express = require('express');
const { upload } = require("../services/ImageUpload");
const { ensureLoggedIn } = require('../middlewear/auth');
const fileUpload = require('express-fileupload');
const { authenticateJWT, ensureCorrectUser } = require('../middlewear/auth');



const router = express.Router();

//upload new image
router.post('/', ensureLoggedIn, fileUpload(), upload, async (req, res, next) => {
    const url = res.locals.data.Location;
    const results = await db.query(`
        INSERT INTO images (creator, s3_url)
        VALUES ($1, $2)
        RETURNING s3_url
    `, ['testuser', url]);

    const image = results.rows[0];
    return res.json({ image });
});

//get all public images
//TODO: also get self images if logged in
router.get('/', async (req, res, next) => {
    const results = await db.query(`
        SELECT * FROM images
        WHERE NOT is_private
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


//user get private image by id
router.get('/:username/images/:id', ensureCorrectUser, async (req, res, next) => {
    const {id, username} = req.params
    const results = await db.query(`
          SELECT * FROM images
          WHERE id = $1 and album_id = $2
      `, [id, 1]);
    if (results.rows.length === 0) {
      return res.json({ error: "not your image or image does not exist" });
    }
    const image = results.rows[0];
    return res.json({ image });
  });

module.exports = router;

