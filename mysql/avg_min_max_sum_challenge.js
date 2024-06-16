import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getAvgOrderAmount() {
    const sql = "SELECT AVG(amount) AS avgOrderAmount FROM orders"
    const [result] = await connection.query(sql)

    return result.pop().avgOrderAmount;
}
const avgOrderAmount = await getAvgOrderAmount();

console.log("avgOrderAmount:", avgOrderAmount);


async function getAvgRoundOrderAmount() {
    const sql = "SELECT ROUND(AVG(amount), 2) AS avgRoundOrderAmount FROM orders"
    const [result] = await connection.query(sql)

    return result.pop().avgRoundOrderAmount;
}
const avgRoundOrderAmount = await getAvgRoundOrderAmount();

console.log("avgRoundOrderAmount:", avgRoundOrderAmount);



async function getCountOrders() {
    const sql = "SELECT COUNT(id) AS countOrders FROM orders"
    const [result] = await connection.query(sql)

    return result.pop().countOrders;
}
const countOrders = await getCountOrders();

console.log("countOrders:", countOrders);

async function getMinOrderAmount() {
    const sql = "SELECT MIN(amount) AS minOrderAmount FROM orders"
    const [result] = await connection.query(sql)

    return result.pop().minOrderAmount;
}
const minOrderAmount = await getMinOrderAmount();

console.log("minOrderAmount:", minOrderAmount);


async function getSumOrderAmount() {
    const sql = "SELECT SUM(amount) AS sumOrderAMount FROM orders"
    const [result] = await connection.query(sql)

    return result.pop().sumOrderAMount;
}
const sumOrderAmount = await getSumOrderAmount();

console.log("sumOrderAmount:", sumOrderAmount);





await connection.end();