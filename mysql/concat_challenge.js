import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function userConcat() {
    const sql = "SELECT CONCAT_WS(', ', id, name, surname, bio) AS userConcat FROM users ";
    const [rows] = await connection.query(sql);

    return rows;
}

const rows = await userConcat();
console.log(rows);

await connection.end();