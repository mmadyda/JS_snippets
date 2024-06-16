import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function createTables() {
    const schoolstudentsSql = `
        CREATE TABLE IF NOT EXISTS schoolstudents (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(16),
            surname VARCHAR(16),
            PRIMARY KEY(id)
        );
    `;

    await connection.query(schoolstudentsSql);

    const schoolgradesSql = `
        CREATE TABLE IF NOT EXISTS schoolgrades (
            id INT NOT NULL AUTO_INCREMENT,
            grade DECIMAL(4, 2),
            PRIMARY KEY(id),
            schoolstudent_id INT,
            FOREIGN KEY(schoolstudent_id) REFERENCES schoolstudents(id)
        );
    `;

    await connection.query(schoolgradesSql);
}

await createTables();

async function insertSchoolStudent(schoolStudent) {
    const sql = `INSERT INTO schoolstudents (name, surname) VALUES (?, ?)`;
    const [result] = await connection.query(sql, [schoolStudent.name, schoolStudent.surname])
    return { ...schoolStudent, id: result.insertId }
}

const student1 = await insertSchoolStudent({
    name: "Grzegorz",
    surname: "Brzęczyszczykiewicz"
});

async function insertSchoolGrades(schoolGrade) {
    const sql = `INSERT INTO schoolgrades (grade, schoolstudent_id) VALUES (?, ?)`;
    const [result] = await connection.query(sql, [schoolGrade.grade, schoolGrade.schoolstudent_id])
    return { ...schoolGrade, id: result.insertId }
}

const grade1 = await insertSchoolGrades({
    grade: 5.0,
    schoolstudent_id: student1.id
});

const grade2 = await insertSchoolGrades({
    grade: 2.0,
    schoolstudent_id: student1.id
});

await connection.close();