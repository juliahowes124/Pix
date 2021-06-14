const db = require('../db');
const express = require('express');
const User = require('../models/user');
const Album = require('../models/album');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const users = await User.all();
  return res.json({users});
})

router.get('/:username', async (req, res, next) => {
  const {username} = req.params;
  const user = await User.get(username);
  return res.json({user});
})

router.get('/:username/albums', async (req, res, next) => {
  const {username} = req.params;
  const albums = await Album.getAllFromUser(username);
  return res.json({albums});
})


module.exports = router;