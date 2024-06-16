import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getAll() {
    const query = "SELECT * FROM users";
    const [data] = await connection.query(query);
    return data;
}

async function insertOne(user) {
    const query = `
        INSERT INTO users (name, surname, age, bio, address)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(
        query,
        [user.name, user.surname, user.age, user.bio, user.address]
    );

    return {...user, id: result.insertId}
}

const userDb = await insertOne({
    name: "Alina",
    surname: "Kowalska",
    age: 30,
    bio: "Programistka",
    address: "Chrząszczyrzewoszyce powiat łękołody"
})

console.log(userDb);

await connection.end();