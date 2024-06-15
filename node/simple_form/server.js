const { log } = require("console");
let http = require("http");
//sparsuje dane do obiektu z parami klucz: wartość
let { parse } = require("querystring");

const htmlform = `
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Formularz</title>
        </head>
        <body>
            <form method="post">
                Imię: <input type="text" name="name"> <br>
                Nazwisko: <input type="text" name="surname"> <br>
                Email: <input type="text" name="email"> <br>
                <input type="submit" value="Wyślij">
            </form>
        </body>
    </html>
`;

http.createServer(
    function (req, res) {
        let data = "";

        req.on("data", function (chunk) {
            data += chunk; //kolejne porcje danych
        })

        req.on("end", function () {
            //wszystkie dane odebrane

            const parsed = parse(data);
            console.log( JSON.stringify(parsed) );
        });

        res.writeHead(200);
        res.write(htmlform);
        res.end();
    }
).listen(8080)
