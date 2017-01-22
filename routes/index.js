var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req ,res){
  console.log("main home page");
  res.render('register');
});

router.get('/result' , function(req , res){
  console.log('Result Page');
  res.render('result');
})

module.exports = router;
