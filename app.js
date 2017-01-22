var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var routes = require('./routes/index');
var auth = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);

app.listen(3000 , function(){
  console.log("listening on port : 3000");
})

module.exports = app;
