import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getOrderById(id) {
    const query = "SELECT * FROM orders WHERE id = ?"
    const [result] = await connection.query(query, [id])

    return result.pop();
}

console.log(await getOrderById(1));

await connection.end();