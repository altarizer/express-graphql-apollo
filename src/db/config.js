import mysql from "promise-mysql";

const dbcfg = {
  host: "127.0.0.1",
  port: 3306,
  user: "{user}",
  password: "{password}",
  database: "{database}",
};

export default mysql.createPool(dbcfg);