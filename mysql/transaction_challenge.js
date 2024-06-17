import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db"
});

await connection.connect();

async function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS countries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(32),
            continent VARCHAR(32),
            population VARCHAR(32),
            created DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    await connection.query(sql);
}

async function insert(country) {
    const sql = "INSERT INTO countries (name, continent, population) VALUES (?, ?, ?)";
    const [result] = await connection.query(sql, [country.name, country.continent, country.population]);

    return { ...country, id: result.insertId };
}

async function getAllCountries() {
    const sql = "SELECT * FROM countries";
    const [result] = await connection.query(sql);
    
    return result;
}

try {
    connection.beginTransaction();
    await createTable()

    const poland = {
        name: "Poland",
        continent: "Europe",
        population: "37mln"
    }

    const spain = {
        name: "Spain",
        continent: "Europe",
        population: "47mln"
    }

    await insert(poland);

    await insert(spain);

    console.log(await getAllCountries());


    connection.commit();

} catch (err) {
    console.log(err);
    connection.rollback();
} finally {
    connection.end();
}
