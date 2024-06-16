import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

await connection.connect();

async function dropDatabase(name) {
    const sql = "DROP DATABASE ??";
    connection.query(sql, [name])
    .catch(err => {
        console.log(err);
    });
}

await dropDatabase("kokocina");

await connection.end()