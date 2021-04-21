/** Database setup for Pixly. */

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"
    ? "postgresql:///pixly_test"
    : "postgresql:///pixly";

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;