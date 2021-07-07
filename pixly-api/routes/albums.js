const express = require('express');
const Album = require('../models/album');

const router = express.Router()

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  const album = await Album.getById(id);
  return res.json({album});
})

router.post('/', async (req, res, next) => {
  const { album } = req.body;
  const { username } = res.locals.user;
  const newAlbum = await Album.create(username, album);
  return res.json({album: newAlbum});
})

module.exports = router;