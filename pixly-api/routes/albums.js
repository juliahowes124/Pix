const db = require('../db');
const express = require('express');
const { authenticateJWT, ensureCorrectUser } = require('../middlewear/auth');

const router = express.Router()

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  const results = await db.query(`
    SELECT * FROM albums
    WHERE id = $1
  `, [id]);
  const album = results.rows[0];
  return res.json({album});
})

module.exports = router;