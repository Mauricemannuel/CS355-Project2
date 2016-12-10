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
    var query = 'SELECT * FROM team;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
}


exports.getById = function(team_id, callback) {
    var query = 'SELECT * FROM team WHERE team_id = ?';
    var queryData = [team_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
exports.getMembersById = function(team_id, callback) {
    var query = 'SELECT i.* FROM individual_team t ' +
        'LEFT JOIN individual i ON t.individual_id = i.individual_id ' +
        'WHERE team_id = ?;';
    var queryData = [team_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
