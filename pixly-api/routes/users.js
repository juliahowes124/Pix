const db = require('../db');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const results = await db.query(`
    SELECT * FROM users
  `);
  const users = results.rows;
  return res.json({users});
})

module.exports = router;