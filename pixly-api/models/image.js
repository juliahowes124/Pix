"use strict";

const db = require("../db");

class Image {
  constructor({ id, s3_url, creator }) {
    this.id = id
    this.s3Url = s3_url
    this.creator = creator
  }

  static async postImage(username, url) {
    const results = await db.query(`
        INSERT INTO images (creator, s3_url)
        VALUES ($1, $2)
        RETURNING creator, s3_url
    `, [username, url]);

    return new Image(results.rows[0]);
  }

  static async getPrivateImages(username) {
    const results = await db.query(`
        SELECT * FROM images
        WHERE creator = $1
        ORDER BY created_at DESC
    `, [username]);
    const images = await Promise.all(results.rows.map(async i => {
      return new Image(i);
    }));
    return images;
  }

  /** fetch image by id */
  static async getById(id, username) {
    const results = await db.query(`
      SELECT * FROM images
      WHERE id = $1 AND creator = $2
    `, [id, username]);

    const image = results.rows[0];

    if (!image) {
      const err = new Error("Can not fetch image");
      err.status = 404;
      throw err;
    }

    return new Image(image);
  }
}

module.exports = Image;