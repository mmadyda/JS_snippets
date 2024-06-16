import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

async function getAllByAge(age) {
    const sql = "SELECT * FROM users WHERE age = ?"
    const [data] = await connection.execute(sql, [age])
    console.log("data:", data);
}

await connection.connect();

getAllByAge(29);

await connection.end();