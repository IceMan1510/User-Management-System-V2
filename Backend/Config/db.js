var Pool = require("pg").Pool;
Pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "IceMan1510",
  database: "ums",
});
module.exports = Pool;
