const express = require("express");
const app = express();
const cors = require("cors");
const users = require('./routes/users');
const auth = require('./routes/auth');
const images = require('./routes/images');
const albums = require('./routes/albums');
const { authenticateJWT} = require("./middleware/auth");
const { NotFoundError } = require("./expressError");

app.use(cors());
// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use(authenticateJWT);

app.use('/users', users);
app.use('/images', images);
app.use('/albums', albums);

app.use('/auth', auth);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;