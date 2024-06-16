import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

async function getUsersBySurnamePrefix(prefix) {
    const filter = prefix + "%";
    const sql = "SELECT * FROM users WHERE surname LIKE ?";

    const [results] = await connection.query(sql, [filter])
    return results;
}

console.log("Nazwiska zaczynające się na 'K'", await getUsersBySurnamePrefix("K"));


async function getUsersBySurnameSuffix(suffix) {
    const filter = "%" + suffix;
    const sql = "SELECT * FROM users WHERE surname LIKE ?";

    const [results] = await connection.query(sql, [filter])
    return results;
}

console.log("Nazwiska kończące się na 'i'", await getUsersBySurnameSuffix("i"));


async function getUsersBySurnameWithStr(str) {
    const filter = "%" + str + "%";
    const sql = "SELECT * FROM users WHERE surname LIKE ?";

    const [results] = await connection.query(sql, [filter])
    return results;
}

console.log("Nazwiska zawierające tekst 'uz'", await getUsersBySurnameWithStr("uz"));


async function getUsersBySurnameWithSecondLetter(letter) {
    const filter = "_" + letter + "%";
    const sql = "SELECT * FROM users WHERE surname LIKE ?";

    const [results] = await connection.query(sql, [filter])
    return results;
}

console.log("Nazwiska których druga litera to 'a'", await getUsersBySurnameWithSecondLetter("a"));


async function getUsersBySurnamePrefixMin4Len(prefix) {
    const filter = prefix + "___%"
    const sql = "SELECT * FROM users WHERE surname LIKE ?";

    const [results] = await connection.query(sql, [filter])
    return results;
}

console.log("Nazwiska zaczynające się na 'a' z minimalnie 4 znakami", await getUsersBySurnamePrefixMin4Len("a"));


await connection.end();