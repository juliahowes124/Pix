const express = require("express");
const app = express();
const cors = require("cors");
const users = require('./routes/users');
const auth = require('./routes/auth');
const images = require('./routes/images');
const albums = require('./routes/albums');
const { authenticateJWT} = require("./middlewear/auth")

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
/** Homepage renders simple message. */

app.get("/", function (req, res) {
  return res.send("Hello World!");
});

module.exports = app;