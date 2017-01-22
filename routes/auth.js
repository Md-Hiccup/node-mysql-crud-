var mysql = require('mysql');
var path = require('path');
var express = require('express');
var router = express.Router();
var conn = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'root',
  database  : 'game'
});
conn.connect(function(err){
  if(!err){
    console.log("Database is connected....\n");
  }
  else {
    console.log("Error connecting Database...\n");
    console.log(err.code+" \n "+err.fatal);
  }
  console.log("connection as id :",conn.threadId);
});
/*
router.post('/login' , function(req ,res){
    console.log("Authentication ");
    db.all("Select Email , Password from signup where Email = ? AND Password = ? ",[ req.body.email ,req.body.password ]
        , function (err , rows) {
        console.log(rows.length) ;   //  console.log(rows[0].Email) ;
            if( err )
            {
                console.log(err);
                res.json({"status" : err.status , "data" : err.message});
            }
            else {
                    if (rows.length == 1)       // (req.body.Email == row.Email)
                    {
                        res.json({"status" : "200" , "data" : "Login successful"});
                       // res.sendFile(path.join(__dirname, '../', 'public', 'html', 'index.html'));
                    }
                    else {
                        res.json({"status" : "500" , "data" : "Login failed"});
                        //  res.sendFile(path.join(__dirname,'../','public','html','home.html'));
                    }

            }
         });

 });*/
router.get('/score' , function(req , res){
  conn.query("select score from scoreboard where gid=(select gid from gamelist where gname = ?) and "+
              "uid=(select uid from user where name = ?);",
    [req.query.ugame , req.query.uname], function(err , rows){
    if(err){
        console.log('Failed ' + err);
        res.json({"status" : "500" , "data" : "Insertion Failed"});
    }
    else {
      var result = JSON.parse(JSON.stringify(rows));
        console.log("score = ",result[0].score);
        console.log(req.query.ugame);
        res.json({"status" : "200" , "data" : "Successfully inserted","rows" : result[0].score});
    }
  });
});

router.put('/updateScore' , function(req , res){
    conn.query("update scoreboard set score = ? "+
        " where gid=(select gid from gamelist where gname = ?) and uid=(select uid from user where name = ?);",
        [req.query.updateScore , req.query.updateGame , req.query.updateName],
        function(err , rows){
            if(err){
                console.log('Failed ' + err);
                res.json({"status" : "500" , "data" : "Insertion Failed"});
            }
            else {
                console.log('succcessss');
                var result = JSON.parse(JSON.stringify(rows));
                console.log("score = ",result);
                console.log(req.query.updateName);
                res.json({"status" : "200" , "data" : "Successfully Updated"});
            }
        });
});

router.delete('/delete' , function(req , res){
    conn.query("delete from user where name = ?",
        [req.body.deleteName],
        function(err , rows){
            if(err){
                console.log('Failed ' + err);
                res.json({"status" : "500" , "data" : "Insertion Failed"});
            }
            else {
                console.log('succcessss');
                //var result = JSON.parse(JSON.stringify(rows));
                //console.log("score = ",result);
                console.log("Query : ",req.body.deleteName);
                res.json({"status" : "200" , "data" : "Successfully Deleted"});
            }
        });
});

router.post('/register' , function( req , res ){
 //   res.json("Register Page");
      console.log(req.body.name);
    conn.query("insert into user ( name , email , password ) values ( ? , ? , ? )" ,
        [req.body.name , req.body.email , req.body.password ] , function(err , rows){
            if(err){
                console.log('Failed ' + err);
                res.json({"status" : "500" , "data" : "Insertion Failed"});
            }
            else {
                console.log('successful');
                //res.end('done') ;
                 res.json({"status" : "200" , "data" : "Successfully inserted"});
            }
        });
    //db.run("update signup set Email = 'stark@mail.com'  where FirstName = 'tony' "  ) ;
    // db.run("delete from signup where FirstName = 'tony' ");
});

module.exports = router ;
