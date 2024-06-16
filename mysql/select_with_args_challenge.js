import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

const sql = "SELECT * FROM users WHERE id >= ? AND age > ? AND age < ?"

const [rows] = await connection.execute(sql, [2, 20, 75]);

console.log("num rows:", rows.length);
console.log("rows:", rows);

await connection.end();