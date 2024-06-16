import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function dropTable(name) {
    const sql = "DROP TABLE ??"
    connection.query(sql, [name])
    .catch(err => {
        console.log(error);
    })
}

await dropTable("smartphones");

console.log("table dropped");

await connection.end();