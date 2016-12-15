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
    console.log("2323");
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

exports.getByIdI = function(individual_id, callback) {
    var query = 'SELECT * FROM individual_team WHERE individual_id = ?';
    var queryData = [individual_id];
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

exports.insert = function(params, callback) {
    var query = 'INSERT INTO team (team_name, team_image_url) VALUES (?, ?)'
    var queryData = [params.team_name, params.team_image_url];
    connection.query(query, queryData, function(err, result) {
        console.log("Result: " + result);
        var team_id = result.insertId;
        var query = 'INSERT INTO individual_team (individual_id, team_id) VALUES ?;'
        var queryData = [];
        if(params.individual_id instanceof Array) {
            for (var i = 0; i < params.individual_id.length; i++) {
                queryData.push([params.individual_id[i], team_id]);
            }
        }
        else {
            queryData.push(([params.individual_id, params.team_id]))
        }
        connection.query(query, [queryData], function(err, result) {
            callback(err, result);
        });
    });
};

exports.insertU = function(params, callback) {
    var query = 'INSERT INTO team (team_id, team_name, team_image_url) VALUES (?, ?, ?)'
    var queryData = [params.team_id, params.team_name, params.team_image_url];
    connection.query(query, queryData, function(err, result) {
        console.log("Result: " + result);
        var team_id = result.insertId;
        var query = 'INSERT INTO individual_team (individual_id, team_id) VALUES ?;'
        var queryData = [];
        if(params.individual_id instanceof Array) {
            for (var i = 0; i < params.individual_id.length; i++) {
                queryData.push([params.individual_id[i], team_id]);
            }
        }
        else {
            queryData.push(([params.individual_id, params.team_id]))
        }
        connection.query(query, [queryData], function(err, result) {
            callback(err, result);
        });
    });
};

exports.delete = function(team_id, callback) {
    var query = 'DELETE FROM team WHERE team_id = ?';
    var queryData = [team_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

