const db = require('../db');
const express = require('express');
const { authenticateJWT, ensureCorrectUser } = require('../middlewear/auth');

const router = express.Router()


router.get('/', async (req, res, next) => {
  const results = await db.query(`
    SELECT * FROM users
  `);
  const users = results.rows;
  return res.json({users});
})


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

//user get all images
router.get('/:username/images', ensureCorrectUser, async (req, res, next) => {
  const {username} = req.params
  const results = await db.query(`
        SELECT * FROM images
        WHERE album_id = $1
    `, [1]);
  if (results.rows.length === 0) {
    return res.json({ error: "upload some images, doofus!" });
  }
  const images = results.rows;
  return res.json({ images });
});


module.exports = router;