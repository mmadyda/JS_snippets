const http = require("http")
http.createServer(
    function(req,res) {
        console.log("Request");
        res.writeHead(200, {"Comntent-type": "text/html"});
        res.end("Hello World!!!")
    }
).listen(8080);
