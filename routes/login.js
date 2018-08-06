var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'
});
connection.connect();
var  addSql = 'INSERT INTO user(id,name,password) VALUES(?,?,?)';
var  addSqlParams = ['3', '12311113333','000000'];


module.exports = router;

