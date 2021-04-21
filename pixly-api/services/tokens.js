const jwt = require('jsonwebtoken');

function createToken(user) {
  let payload = {username: user.username};
  return jwt.sign(payload, process.env.SECRET_KEY)
}

module.exports = {createToken}