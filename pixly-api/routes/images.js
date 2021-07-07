const express = require('express');
const { upload } = require("../services/ImageUpload");
const fileUpload = require('express-fileupload');
const { ensureLoggedIn } = require('../middleware/auth');
const Image = require('../models/image');

const router = express.Router();

/** Uploads a new image for currently logged in user */
router.post('/', ensureLoggedIn, fileUpload(), upload, async (req, res, next) => {
    const url = res.locals.data.Location;
    const username = res.locals.user.username;
    const image = await Image.postImage(username, url)
    return res.json({ image });
});

/** GETs all public images */
router.get('/', async (req, res, next) => {
    const images = await Image.getPublicImages();
    return res.json({ images });
});

/** GETs public image by id */
router.get('/:id', ensureLoggedIn, async (req, res) => {
    const id = req.params.id;
    const image = await Image.getById(id);
    return res.json({ image });
});

module.exports = router;

