const db = require('../db');
const express = require('express');
const {upload} = require("../services/ImageUpload");
const { ensureLoggedIn } = require('../middlewear/auth');
const parser = require('exif-parser');


const router = express.Router();

function getImageFromRequest(req, res, next) {
    const img = req.body.image;
    console.log(img)
}

router.post('/', ensureLoggedIn, getImageFromRequest, upload.single('image'), async (req, res, next) => {
    console.log
    // const p = parser.create(req.file.location);
    // const result = p.parse();

    // const url = req.file.location;
    // const { username } = res.locals.user;
    // const results = await db.query(`
    //     INSERT INTO images (location, camera, username, is_private, url)
    //     VALUES ($1, $2, $3, $4, $5 )

    // `, []);
    // return res.json({ msg: "something happened" });
});

module.exports = router;

