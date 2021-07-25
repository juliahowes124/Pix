"use strict";

const db = require("../db");

class Image {
  constructor({ id, s3_url, is_private, creator }) {
    this.id = id
    this.s3Url = s3_url
    this.isPrivate = is_private
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

  static async getPublicImages() {
    const results = await db.query(`
        SELECT * FROM images
        WHERE NOT is_private
        ORDER BY created_at DESC
    `);
    const images = await Promise.all(results.rows.map(async i => {
      return new Image(i);
    }));
    return images;
  }

  /** fetch image by id */
  static async getById(id) {
    const results = await db.query(`
      SELECT * FROM images
      WHERE id = $1
      AND NOT is_private
    `, [id]);

    const image = results.rows[0];

    if (!image) {
      const err = new Error("Private image or image does not exist");
      err.status = 404;
      throw err;
    }

    return new Image(image);
  }
}

module.exports = Image;