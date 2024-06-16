import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function insertOneOrder(order) {
    const query = `
        INSERT INTO orders (user_id, amount) VALUES (?, ?)
    `;

    const [result] = await connection.query(query, [order.user_id, order.amount])
    
    return { ...order, id: result.insertId }
}

const order1 = await insertOneOrder({
    user_id: 1,
    amount: 55
})

async function getOrderByUserId(user_id) {
    const query = "SELECT * FROM orders WHERE user_id = ?"

    const [result] = await connection.query(query, [user_id])
    console.log("result: ", result);
}

await getOrderByUserId(order1.user_id);

await connection.end();