const dbFilePath = "db/db.csv";

var fs = require("fs");
const csv2json = require("csvjson");
const json2csv = require("json2csv");

module.exports.controller = function(app){

app.get('/userlist', function(req, res){
  var excel = ReadDatabaseCSV();
  res.render('userList.ejs', {users: excel});
})

  app.get('/register', function(req, res) {
      res.render('registerUser.ejs');
  });

  app.post('/add', function(req, res) {
    console.log(req.body);

    var array = Object.keys(req.body).map(champ => champ);
    try {
        var excel = ReadDatabaseCSV();
        excel.push(req.body);

        WriteToDatabaseCSV(excel, array);
    }
    catch (err){
        res.status(500).send(err);
    }
      res.render('userCreated.ejs');
  });

  function ReadDatabaseCSV(){
    var excel;
    try {
        excel = fs.readFileSync(dbFilePath, {encoding: "utf8"});
        excel = csv2json.toSchemaObject(excel, {delimiter: ";"});
    }
    catch (err){
        excel = []; //that's a bad practice, but we don't care for now. TODO: Use a function in 'fs' to verify if the file exists. Only do the try catch for csv2json, and raise the exception.
    }
      return excel;
  }

  function WriteToDatabaseCSV(excel, array){

      var result = json2csv({data: excel, fields: array, del: ";", quotes: ''});

      fs.writeFile(dbFilePath, result, function(err) {
          if (err) res.status(500).send(err);
      });
  }

}
