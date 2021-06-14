"use strict";

const db = require("../db");

class Album {
  constructor({ id, name, is_private, creator }) {
    this.id = id
    this.name = name
    this.is_private = is_private
    this.creator = creator
  }

  /** fetch user's albums */
  static async getAllFromUser(username) {
    const results = await db.query(`
      SELECT * FROM albums
      WHERE creator = $1
    `, [username]);
    let albums = await Promise.all(results.rows.map(async a => {
      return new Album(a);
    }));
    return albums;
  }

  /** fetch album by id */
  static async getById(id) {
    const results = await db.query(`
      SELECT * FROM albums
      WHERE id = $1
    `, [id]);

    const album = results.rows[0];

    if (!album) {
      const err = new Error("No such album");
      err.status = 404;
      throw err;
    }

    return new Album(album);
  }
}

module.exports = Album;