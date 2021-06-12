const db = require('../db');
const express = require('express');
const { authenticateJWT, ensureCorrectUser } = require('../middlewear/auth');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const results = await db.query(`
    SELECT username FROM users
  `);
  const users = results.rows;
  return res.json({users});
})

router.get('/:username', async (req, res, next) => {
  const {username} = req.params;
  const results = await db.query(`
    SELECT username, albums.id, albums.name FROM users
    LEFT JOIN albums
    ON creator = $1 
  `, [username]);
  const user = results.rows[0];
  return res.json({user});
})

router.get('/:username/albums', async (req, res, next) => {
  const {username} = req.params;
  const results = await db.query(`
    SELECT albums.id, name FROM albums
    WHERE creator = $1
  `, [username]);
  const albums = results.rows;
  return res.json({albums});
})


module.exports = router;