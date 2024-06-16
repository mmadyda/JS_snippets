import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function dropDable(name) {
    const sql = "DROP TABLE ??";

    await connection.query(sql, [name])
    .catch(err => {
        console.log();
    })
}

await dropDable("customers");

console.log("Table deleted");

await connection.end();