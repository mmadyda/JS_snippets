import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [data] = await connection.query(query, [id])

    return data.pop();
}

console.log(await getById(1));


await connection.end();