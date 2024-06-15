let fs = require("fs");

const filename = "./data/writeFile.txt"

fs.writeFile(filename, "Hello again!", function(err) {
    if(err) throw err;
    console.log("File saved: "+ filename);
});
