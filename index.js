const express = require("express");
const http = require("http");
const fs = require("fs");
var url = require('url');
const app = express();

const hostname = '127.0.0.1';
const port = '8080';

app.use("/app/src", express.static('/app/src'));

app.get('/', (req, res) => {
    fs.readFile("app/src/template/index.html", (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
})

app.listen(port);