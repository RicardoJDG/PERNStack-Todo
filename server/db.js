const { Pool } = require("pg");

const pool = new Pool({
  user: "migracode",
  password: "occlaptop1",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
