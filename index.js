const express = require("express");
const http = require("http");
const fs = require("fs");
var url = require('url');
const app = express();
const bodyParser = require('body-parser');
const csv2json = require('csvjson');
const json2csv = require('json2csv');

const dbPath = "db/users.csv";

var urlParser = bodyParser.urlencoded({extended: true});
const hostname = '127.0.0.1';
const port = '8080';

app.use("/app/src", express.static('/app/src'));

app.get('/', (req, res) => {
    fs.readFile("app/src/template/index.html", (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
    })
})

app.post("/add", urlParser, (req, res) => {
    var array = Object.keys(req.body).map(champ => champ);
    console.log(array);
    try {
        //Try to open csv file
        var excel;
        try {
            excel = fs.readFileSync(dbPath, {encoding: "utf8"});
            excel = csv2json.toSchemaObject(excel, {delimiter: ',', quote: '"'});
        }
        catch (err){
            excel = [];
        }
        excel.push(req.body);
        console.log(excel); 
        var result = json2csv({data: excel, fields: array});     
        console.log(result);
        fs.writeFile(dbPath, result, function(err) {
            if (err) throw err;
        });
        
        res.send();
    }
    catch (err){
        console.log(err);
        res.status(500).send(err);
    }
    
})

app.listen(port);