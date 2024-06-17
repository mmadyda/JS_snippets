import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db"
});

await connection.connect();

async function insert(employee) {
    const query = `
        INSERT INTO employees (name, surname, email, occupation, age)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(
        query,
        [
            employee.name, 
            employee.surname,
            employee.email,
            employee.occupation,
            employee.age
        ]
    )

    return { ...employee, id: result.insertId}
}

try {
    await connection.beginTransaction();

    const sql = `
        CREATE TABLE IF NOT EXISTS employees (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(16) NOT NULL,
            surname VARCHAR(16) DEFAULT NULL,
            email VARCHAR(64) DEFAULT NULL,
            occupation VARCHAR(20) DEFAULT NULL,
            age INT DEFAULT 18,
            reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;

    await connection.query(sql)

    const employee1 = await insert({
        name: "Ania",
        surname: "Kowalska",
        email: "ania@example.com",
        occupation: "programmer",
        age: 30
    })

    console.log("Saved employee1 with id:", employee1.id);

    const employee2 = await insert({
        name: "Kasia",
        surname: "Kowalska",
        email: "kasia@example.com",
        occupation: "PM",
        age: 30
    })

    console.log("Saved employee2 with id:", employee2.id);

    await connection.commit();

} catch (err) {
    console.log(err);
    await connection.rollback();
} finally {
    await connection.end();
}