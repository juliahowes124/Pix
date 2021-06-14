"use strict";

const db = require("../db");

class User {
  constructor({ username }) {
    this.username = username;
  }

  /** fetch all users */
  static async all() {
    const results = await db.query(`
      SELECT username FROM users
    `);
    let users = await Promise.all(results.rows.map(async u => {
      let newUser = new User(u);
      return newUser;
    }));
    return users;
  }

  /** fetch user by username */
  static async get(username) {
    const results = await db.query(`
      SELECT username, albums.id, albums.name FROM users
      LEFT JOIN albums
      ON creator = $1 
    `, [username]);

    const user = results.rows[0];

    if (user === undefined) {
      const err = new Error(`No such user: ${username}`);
      err.status = 404;
      throw err;
    }

    return new User(user);
  }
}

module.exports = User;