let http = require("http");
let formidable = require("formidable");
let fs = require("fs");

let htmlForm = `
    <html>
        <head>
        <head>
        <body>
            <form method="post" action="/upload" enctype="multipart/form-data">
                <input type="file" name = "file1"> <br>
                <input type="submit" value="Send">
            </form>
        </body>
    </html>
`;

http.createServer(
    function (req, res) {
        if(req.url === "/upload") {
            let form = new formidable.IncomingForm();

            form.parse(req, function(err, fields, files) {
                console.log(JSON.stringify(files));

                let tempPath = files.file1[0].filepath;
                let newPath = "./static/" + files.file1[0].originalFilename;

                fs.rename(tempPath, newPath, function (err) {
                    if(err) {
                        res.end("file upload error");
                    } else {
                        res.end("upload completed")
                    }
                });
            });
        } else {
            res.writeHead(200, {"Content-type" : "text/html"});
            res.write(htmlForm);
            res.end();
        }
    }
).listen(8080);
