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

app.use('/app/src', express.static('app/src'));

app.get('/', (req, res) => {
    fs.readFile("app/src/template/index.html", (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
    })
})

app.post("/add", urlParser, (req, res) => {
    var array = Object.keys(req.body).map(champ => champ);
    try {
        var excel;
        //Try to open csv file    
        try {
            excel = fs.readFileSync(dbPath, {encoding: "utf8"});
            excel = csv2json.toSchemaObject(excel, {delimiter: ";"});
        }
        catch (err){
            excel = [];
        }
        //We add the new line in the json before rewrite the csv file with the new json
        excel.push(req.body);
        var result = json2csv({data: excel, fields: array, del: ";", quotes: ''});  
        fs.writeFile(dbPath, result, function(err) {
            if (err) res.status(500).send(err);
        });

        res.send();
    }
    catch (err){
        res.status(500).send(err);
    }

})

app.get("/liste", (req, res) => {
    var excel;
    //Try to open csv file    
    try {
        excel = fs.readFileSync(dbPath, {encoding: "utf8"});
        excel = csv2json.toSchemaObject(excel, {delimiter: ";"});
    }
    catch (err){
        excel = [];
    }
    res.send(excel);
})

app.post("/delete",urlParser, (req, res) => {
    var array = req.body.select;
    var newExcel = [];
    try {
        excel = fs.readFileSync(dbPath, {encoding: "utf8"});
        excel = csv2json.toSchemaObject(excel, {delimiter: ";"});
    }
    catch (err){
        excel = [];
    }

    excel.forEach((elem, index) => {
        if(array.indexOf(index == -1)){
            console.log(array, index, array.indexOf(index)  -1);
            newExcel.push(elem);
        }
    })
    var result = json2csv({data: newExcel, fields: array, del: ";", quotes: ''});  
    fs.writeFile(dbPath, result, function(err) {
        if (err) res.status(500).send(err);
    });
    console.log(newExcel);
    res.send(newExcel);

})

app.listen(port);
