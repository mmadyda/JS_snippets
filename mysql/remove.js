import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function removeById(id) {
    const query = "DELETE FROM users WHERE id = ?"

    await connection.query(query, [id]);

    return
}

await removeById(13);

await connection.end();