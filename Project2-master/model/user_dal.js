var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM user;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.logIn = function(params, callback) {
    var query = 'SELECT * FROM user u ' +
        'WHERE u.username = ? and u.password = ?';
    console.log("username: " + params.username + " password: " + params.pass);
    var queryData = [params.username, params.password];
    connection.query(query, queryData, function (err, result) {
        console.log("Result: " + result);
        callback(err, result);
    });
};

exports.Who = function(params, callback) {
    var query = 'SELECT * FROM user u ' +
        'WHERE u.username = ? and u.password = ?';
    console.log("username: " + params.username + " password: " + params.pass);
    var queryData = [params.username, params.password];
    connection.query(query, queryData, function (err, result) {
        console.log("Result: " + result);
        callback(err, result);
    });
};