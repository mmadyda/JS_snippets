import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getUsersWithOrders() {
    const sql = `
        SELECT users.id, users.name, users.surname, orders.id as order_id, orders.user_id as order_user_id, orders.amount, orders.created
        FROM users LEFT JOIN orders ON users.id = orders.user_id ORDER BY users.id
    `

    const [rows] = await connection.query(sql);
    return rows;
}

const users = await getUsersWithOrders();
console.log(users);

await connection.end();