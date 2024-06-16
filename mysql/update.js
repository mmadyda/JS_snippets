import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [data] = await connection.query(query, [id])

    return data.pop();
}

async function update(user) {
    if(! user.id) return null;

    const query = `
        UPDATE users SET name = ?,
        surname = ?
        WHERE id = ?
    `;

    await connection.query(query, [user.name, user.surname, user.id])

    return user;
}


console.log( await getById(10));

await update({
    id: 10,
    name: "Karol",
    surname: "Kokocinowski"
})

console.log( await getById(10));

await connection.end();