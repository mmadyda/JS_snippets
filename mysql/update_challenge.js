import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getAllOrders() {
    const query = "SELECT * FROM orders"

    const [result] = await connection.query(query)

    return result
}

console.log(await getAllOrders());

async function getOrderById(id) {
    const query = "SELECT * FROM orders WHERE id = ?"
    const [result] = await connection.query(query, [id])

    return result
}



async function updateOrder(order) {
    if(! order.id) return null;

    const query = `
        UPDATE orders SET user_id = ?, amount = ? WHERE id = ?
    `;

    await connection.query(query, [order.user_id, order.amount, order.id])

    return order;
}
console.log(await getOrderById(1));

await updateOrder({
    id: 1,
    user_id: 1,
    amount: 200,
})

console.log(await getOrderById(1));

console.log(await getAllOrders());

await connection.end();