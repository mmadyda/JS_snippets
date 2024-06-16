import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();


async function getAvgAge() {
    const sql = "SELECT AVG(age) AS avgAge FROM users"
    const [rows] = await connection.query(sql);

    return rows.pop().avgAge;
}

const avgAge = await getAvgAge();

console.log("Average age:", avgAge);

async function getAvgRoundAge() {
    const sql = "SELECT ROUND(AVG(age), 2) AS avgRoundAge FROM users"
    const [rows] = await connection.query(sql);

    return rows.pop().avgRoundAge;
}

const avgRoundAge = await getAvgRoundAge();

console.log("Average round age:", avgRoundAge);


async function countUsers() {
    const sql = "SELECT COUNT (id) AS numUsers FROM users";
    const [rows] = await connection.query(sql);

    return rows.pop().numUsers;
}

const numUsers = await countUsers();

console.log("Num users: ", numUsers);

async function getMaxAge() {
    const sql = "SELECT MAX(age) AS maxAge FROM users"
    const [rows] = await connection.query(sql);

    return rows.pop().maxAge;
}

const maxAge = await getMaxAge();

console.log("Max age:", maxAge);


async function getMinAge() {
    const sql = "SELECT MIN(age) AS minAge FROM users"
    const [rows] = await connection.query(sql);

    return rows.pop().minAge;
}

const minAge = await getMinAge();

console.log("Min age:", minAge);


async function sumAge() {
    const sql = "SELECT SUM(age) AS sumAge FROM users";
    const [rows] = await connection.query(sql);
    return rows.pop().sumAge;
}

const ageSum = await sumAge();

console.log("Age sum:",ageSum);

await connection.end();