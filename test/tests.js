var express = require('express');
var mysql = require('mysql');
var app = express();

var pool = mysql.createPool({
  connectionLimit : 100,
  host  : 'localhost',
  user  : 'root',
  password  : 'root',
  database  : 'hiccup',
  debug : false
});

function handle_database(req, res){
    pool.getConnection(function (err ,connection){
      if(err){
        connection.release();
        res.json({"code" : 100,"status" : "Error in connection database"});
        return ;
      }
      else{
        console.log("connection established");
      }
      console.log("connected as id ", connection.threadId);
      connection.query({sql :'select * from potluck',timeout : 20000},function(err ,rows){
      /*  if (err && err.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('too long to count table rows!');
          }
          if(err){
            throw error;
          }
      */  connection.release();
          if(!err){
            res.json(rows);
          }
        });
    /*    connection.ping(function(err){
          if(err) throw err ;
          console.log("Server responded to ping");
        })
    */  connection.on('error' , function(err){
      res.json({"code" : 100, "status" : "Error in connection database"});
      return   ;
    });
});
}

app.get("/" , function(req , res){
  handle_database(req ,res);
});

app.listen(3009);
