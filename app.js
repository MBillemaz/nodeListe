var express = require('express'),
http = require('http'),
path = require('path'),
fs = require('fs'),
bodyParser = require('body-parser'),
app = express();

var urlParser = bodyParser.urlencoded({extended: true});


// database connection
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mydb');

// some environment variables
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});


app.listen(app.get('port'), () => {
  console.log("server listening on port " + app.get('port'));
});
