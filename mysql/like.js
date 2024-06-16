import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getUsers1(prefix) {
    const str = prefix + "%"; // "A%"
    const sql = "SELECT * FROM users WHERE name like ?"
    const [rows] = await connection.query(sql, [str]);

    return rows;
}

const users1 = await getUsers1("A")

console.log("User starting with A", users1);


async function getUsers2(suffix) {
    const str = "%" + suffix; // "A%"
    const sql = "SELECT * FROM users WHERE name like ?"
    const [rows] = await connection.query(sql, [str]);

    return rows;
}

const users2 = await getUsers2("a")

console.log("Users ending with A", users2);


async function getUsers3(key) {
    const str = "%" + key + "%"; // "A%"
    const sql = "SELECT * FROM users WHERE name like ?"
    const [rows] = await connection.query(sql, [str]);

    return rows;
}

const users3 = await getUsers3("a")

console.log("Users containing a", users3);


async function getUsers4(letter) {
    const str = "__" + letter + "%"; // "A%"
    const sql = "SELECT * FROM users WHERE name like ?"
    const [rows] = await connection.query(sql, [str]);

    return rows;
}

const users4 = await getUsers4("s")

console.log("Users third letter", users4);



async function getUsers5(firstLetter) {
    const str =  firstLetter + "__%"; // "A%"
    const sql = "SELECT * FROM users WHERE name like ?"
    const [rows] = await connection.query(sql, [str]);

    return rows;
}

const users5 = await getUsers5("K")

console.log("Users first letter K and min 3 letters", users5);

await connection.end();