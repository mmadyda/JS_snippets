// operacje na plikach

let fs = require("fs");

const filename = "./data/newFile_" + Date.now() + ".txt";

fs.open(filename, "w", function (err, file) {
    if(err) throw err;

    console.log("File saved: " + filename);
});