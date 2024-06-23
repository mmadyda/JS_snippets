import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

await connection.connect();

function showUsers(info, dbRows) {
    console.log(info);

    dbRows.forEach(r => {
        console.log(r.id, r.name, r.surname, r.bio, r.address, r.age, r.created);
    });
}


async function getUsersBetweenAge(ageFrom, ageTo) {
    const sql = "SELECT * FROM users WHERE age BETWEEN ? and ?";
    const [rows] = await connection.query(sql, [ageFrom, ageTo])

    return rows;
}

const user1 = await getUsersBetweenAge(30,50);

showUsers("Users witch age between 30 and 50", user1)


async function getUsersNotBetweenAge(ageFrom, ageTo) {
    const sql = "SELECT * FROM users WHERE age NOT BETWEEN ? and ?";
    const [rows] = await connection.query(sql, [ageFrom, ageTo])

    return rows;
}

const user2 = await getUsersNotBetweenAge(30,50);

showUsers("Users witch age not between 30 and 50", user2)

function getMySQLDateStr(date) {
    return date.getFullYear()
        + "-" + (date.getMonth() + 1).toString().padStart(2,"0")
        + "-" + date.getDate().toString().padStart(2,"0")
        + " " + date.getHours().toString().padStart(2,"0")
        + ":" + date.getMinutes().toString().padStart(2,"0")
        + ":" + date.getSeconds().toString().padStart(2,"0");
}

function addDaysToDate(date, days) {
    return new Date( date.getTime() + (60 * 60 * 24 * 1000 * days));
}

const dateFrom = addDaysToDate(new Date(), -30)

console.log("Date from:", dateFrom);

const dateTo = addDaysToDate(new Date(), 1)
console.log("Date to:", dateTo);

async function getUserCreatedBetween(dateFrom, dateTo){
    const dateFromStr = getMySQLDateStr(dateFrom)
    const dateToStr = getMySQLDateStr(dateTo)

    const sql = "SELECT * FROM users WHERE created BETWEEN ? AND ?";
    const [rows] = await connection.query(sql, [dateFromStr, dateToStr])
    return rows
}

const users3 = await getUserCreatedBetween(dateFrom, dateTo)

showUsers("Users created between dates:", users3)
await connection.end();