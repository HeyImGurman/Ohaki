const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.query("SELECT NOW()")
    .then((result) => {
        console.log("PostgreSQL connected!");
        console.log("Database time:", result.rows[0].now);
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });

module.exports = pool;

 