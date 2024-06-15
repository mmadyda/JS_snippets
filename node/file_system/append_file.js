let fs = require("fs")

const filename = "./data/appendFile.txt"

fs.appendFile(filename, "Hello world", function(err) {
    if(err) throw err;
    console.log("File saved: "+ filename);
});
