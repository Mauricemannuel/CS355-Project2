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

exports.insert = function(params, callback) {
    var query = 'INSERT INTO ability (ability_name, description) VALUES (?, ?)'
    var queryData = [params.ability_name, params.description];
    connection.query(query, queryData, function(err, result) {
        console.log("Result: " + result);
        var ability_id = result.insertId;
        var query = 'INSERT INTO individual_ability (individual_id, ability_id) VALUES ?;'
        var queryData = [];
        if(params.individual_id instanceof Array) {
            for (var i = 0; i < params.individual_id.length; i++) {
                queryData.push([params.individual_id[i], ability_id]);
            }
        }
        else {
            queryData.push(([params.individual_id, params.ability_id]))
        }
        connection.query(query, [queryData], function(err, result) {
            callback(err, result);
        });
    });
};

exports.insertU = function(params, callback) {
    var query = 'INSERT INTO ability (ability_id, ability_name, description) VALUES (?, ?, ?)'
    var queryData = [params.ability_id, params.ability_name, params.description];
    connection.query(query, queryData, function(err, result) {
        console.log("Result: " + result);
        var ability_id = result.insertId;
        var query = 'INSERT INTO individual_ability (individual_id, ability_id) VALUES ?;'
        var queryData = [];
        if(params.individual_id instanceof Array) {
            for (var i = 0; i < params.individual_id.length; i++) {
                queryData.push([params.individual_id[i], ability_id]);
            }
        }
        else {
            queryData.push(([params.individual_id, params.ability_id]))
        }
        connection.query(query, [queryData], function(err, result) {
            callback(err, result);
        });
    });
};

exports.delete = function(ability_id, callback) {
    var query = 'DELETE FROM ability WHERE ability_id = ?';
    var queryData = [ability_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};