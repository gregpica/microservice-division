const pgPromise = require('pg-promise');

require('dotenv').config();
let connStr = process.env.DATABASE_URL;

if (process.env.POSTGRES_DB_URI) {
    connStr = process.env.POSTGRES_DB_URI;
}

const pgp = pgPromise({});
const db = pgp(connStr); 

module.exports = db;