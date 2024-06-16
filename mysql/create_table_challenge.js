import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS smartphones (
            id INT NOT NULL AUTO_INCREMENT,
            brand VARCHAR(32),
            name VARCHAR(32),
            screenSize INT DEFAULT 3,
            premiere DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        ); 
    `;

    connection.query(sql)
    .catch(err => {
        console.log(err);
    });
};

await createTable();


await connection.end();