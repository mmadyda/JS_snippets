import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function removeOrderById(id) {
    const query = "DELETE FROM orders WHERE id = ?";
    await connection.query(query, [id])

    return
}

async function getAllOrders() {
    const query = "SELECT * FROM orders";
    const [data] = await connection.query(query);

    return data
}

console.log(await getAllOrders());

await removeOrderById(5);

console.log(await getAllOrders());

await connection.end();