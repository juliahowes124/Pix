const express = require("express");
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/auth', auth);

/** Homepage renders simple message. */

app.get("/", function (req, res) {
  return res.send("Hello World!");
});

module.exports = app;