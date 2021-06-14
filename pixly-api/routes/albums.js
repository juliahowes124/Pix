const express = require('express');
const Album = require('../models/album');

const router = express.Router()

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  const album = await Album.getById(id);
  return res.json({album});
})

module.exports = router;