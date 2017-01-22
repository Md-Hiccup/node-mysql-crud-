var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'root',
  database  : 'game'
});
var app = express();

//connection.query('SELECT 1', function(err , rows){
connection.connect(function(err){
  if(!err){
    console.log("Database is connected....\n");
  }
  else {
    console.log("Error connecting Database...\n");
    console.log(err.code+" \n "+err.fatal);
  }
  console.log("connection as id :",connection.threadId);
});

app.get('/', function (req, res){
  connection.query('select gname from gamelist', function(err, rows, fields){
    connection.end();
      if(!err){
          console.log('The solution is : ', rows);

      }
      else {
          console.log('Error while performing Query .');
      }
  });
});

app.listen(3009 , function(){
  console.log("Listening on port 3009");
});
