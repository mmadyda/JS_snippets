import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getUserBySurname(...surnameArr) {
    const surnames = "(" + surnameArr.map(v => `"${v}"`).join(",") + ")"
    const sql = "SELECT * FROM users WHERE surname IN " + surnames
    const [records] = await connection.query(sql);

    return records;
}

const surnames1 = await getUserBySurname("Adamski", "Danielski");

console.log("surnames1", surnames1);


async function getUserWithoutSurname(...surnameArr) {
    const surnames = "(" + surnameArr.map(v => `"${v}"`).join(",") + ")"
    const sql = "SELECT * FROM users WHERE surname NOT IN " + surnames
    const [records] = await connection.query(sql);

    return records;
}

const surnames2 = await getUserWithoutSurname("Adamski", "Danielski");

console.log("surnames2", surnames2);

await connection.end();