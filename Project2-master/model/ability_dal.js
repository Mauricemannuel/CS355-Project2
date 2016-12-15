var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view individual_view as
 select s.*, a.street, a.zipcode from individual s
 join address a on a.address_id = s.address_id;

 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM ability;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
}


exports.getById = function(ability_id, callback) {
    var query = 'SELECT * FROM ability WHERE ability_id = ?';
    var queryData = [ability_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByIdI = function(individual_id, callback) {
    var query = 'SELECT * FROM individual_ability WHERE individual_id = ?';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getPoweredPeople = function(ability_id, callback) {
    var query = 'SELECT i.* FROM individual_ability t ' +
        'LEFT JOIN individual i ON t.individual_id = i.individual_id ' +
        'WHERE ability_id = ?;';
    var queryData = [ability_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
