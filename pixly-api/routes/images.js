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

/** GETs all images for user */
router.get('/', async (_, res) => {
    const user = res.locals.user
    const images = await Image.getPrivateImages(user.username);
    return res.json({ images });
});

/** GETs image by id */
router.get('/:id', ensureLoggedIn, async (req, res) => {
    const id = req.params.id;
    const user = res.locals.user
    const image = await Image.getById(id, user.username);
    return res.json({ image });
});

module.exports = router;

