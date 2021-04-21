const db = require('../db');
const express = require('express');
const jsonschema = require("jsonschema");
const userRegisterSchema = require('../schemas/userRegister.json');
const { BadRequestError } = require("../expressError");
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const validator = jsonschema.validate(req.body, userRegisterSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const {username, password, firstName, lastName} = req.body;

  const duplicateCheck = await db.query(
    `SELECT username
     FROM users
     WHERE username = $1`,
  [username],
  );

  if (duplicateCheck.rows[0]) {
  throw new BadRequestError(`Duplicate username: ${username}`);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await db.query(
      `INSERT INTO users
      (username,
        password,
        first_name,
        last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING username, first_name AS "firstName", last_name AS "lastName"`,
    [
      username,
      hashedPassword,
      firstName,
      lastName
    ],
  );

  const user = result.rows[0];

  return res.json({user});
})

module.exports = router;