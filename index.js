import mariadb from "mariadb";
import { readFileSync } from "fs";

const pool = mariadb.createPool({
	user: "root",
	password: "root",
	multipleStatements: true,
});

const conn = await pool.getConnection();

const ddl = readFileSync("ddl.sql", "utf8");
const ddlResult = await conn.query(ddl);
console.log(ddlResult);

conn.end();
pool.end();
