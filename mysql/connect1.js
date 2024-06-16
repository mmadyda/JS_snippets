import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

connection.connect();

connection.query( "SELECT 10 + 2 AS solution", function(err, result, fields) {
    if(err) throw err 
    console.log("Solution is: ", result[0].solution);
} );

connection.end();