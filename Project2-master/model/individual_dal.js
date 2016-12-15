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
    var query = 'SELECT * FROM individual;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
}

exports.getThreat = function(callback) {
    var query = 'SELECT * FROM threat;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
}

exports.getAllInTeams = function(callback) {
    var query = 'SELECT a.*, i.* FROM individual i ' +
        'LEFT JOIN individual_team ia ON i.individual_id = ia.individual_id ' +
        'LEFT JOIN team a ON ia.team_id = a.team_id ' +
        'where a.team_id > -1';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getGood = function(callback) {
    var query = 'SELECT * FROM individual i ' +
        'LEFT JOIN individual_threat t ON i.individual_id = t.individual_id ' +
        'WHERE t.threat_id = 1;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getBad = function(callback) {
    var query = 'SELECT * FROM individual i ' +
        'LEFT JOIN individual_threat t ON i.individual_id = t.individual_id ' +
        'WHERE t.threat_id = 3;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(individual_id, callback) {
    var query = 'SELECT * FROM individual WHERE individual_id = ?';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByIdThreat = function(individual_id, callback) {
    var query = 'SELECT * FROM individual_threat WHERE individual_id = ?';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getAbilities = function(individual_id, callback) {
    var query = 'SELECT a.* FROM individual i ' +
        'LEFT JOIN individual_ability ia ON i.individual_id = ia.individual_id ' +
        'LEFT JOIN ability a ON ia.ability_id = a.ability_id ' +
        'WHERE i.individual_id = ?';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getTeamsByID = function(individual_id, callback) {
    var query = 'SELECT a.* FROM individual i ' +
        'LEFT JOIN individual_team ia ON i.individual_id = ia.individual_id ' +
        'LEFT JOIN team a ON ia.team_id = a.team_id ' +
        'WHERE i.individual_id = ?';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getAllTeams = function(callback) {
    var query = 'SELECT * FROM team';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO individual (display_name, real_name, image_url) VALUES (?, ?, ?)'
    var queryData = [params.display_name, params.real_name, params.img_url];
    connection.query(query, queryData, function(err, result) {
        console.log("Result: " + result);
        var individual_id = result.insertId;
        var query = 'INSERT INTO individual_team (individual_id, team_id) VALUES ?;'
        var queryData = [];
        if(params.team_id instanceof Array) {
            for (var i = 0; i < params.team_id.length; i++) {
                queryData.push([individual_id, params.team_id[i]]);
            }
        }
        else {
            queryData.push(([individual_id, params.team_id]))
        }
        connection.query(query, [queryData], function(err, result) {
            var query = 'INSERT INTO individual_team (individual_id, team_id) VALUES ?;'
            var queryData = [];
            if(params.team_id instanceof Array) {
                for (var i = 0; i < params.team_id.length; i++) {
                    queryData.push([individual_id, params.team_id[i]]);
                }
            }
            else {
                queryData.push(([individual_id, params.team_id]))
            }
            connection.query(query, [queryData], function(err, result) {
                var query = 'INSERT INTO individual_ability (individual_id, ability_id) VALUES ?;'
                var queryData = [];
                if(params.ability_id instanceof Array) {
                    for (var i = 0; i < params.ability_id.length; i++) {
                        queryData.push([individual_id, params.ability_id[i]]);
                    }
                }
                else {
                    queryData.push(([individual_id, params.ability_id]))
                }
                connection.query(query, [queryData], function(err, result) {
                    var query = 'INSERT INTO individual_threat (individual_id, threat_id) VALUES (?, ?);'
                    var queryData = [individual_id, params.threat_id];
                    connection.query(query, queryData, function(err, result) {
                        callback(err, result);
                    });
                });
            });
        });
    });
};

exports.insertU = function(params, callback) {
    var individual_id = params.individual_id;
    var query = 'INSERT INTO individual (individual_id, display_name, real_name, image_url) VALUES (?, ?, ?, ?)'
    var queryData = [individual_id, params.display_name, params.real_name, params.img_url];
    connection.query(query, queryData, function(err, result) {
        console.log("Result: " + result);
        var query = 'INSERT INTO individual_team (individual_id, team_id) VALUES ?;'
        var queryData = [];
        if(params.team_id instanceof Array) {
            for (var i = 0; i < params.team_id.length; i++) {
                queryData.push([individual_id, params.team_id[i]]);
            }
        }
        else {
            queryData.push(([individual_id, params.team_id]))
        }
        connection.query(query, [queryData], function(err, result) {
            var query = 'INSERT INTO individual_team (individual_id, team_id) VALUES ?;'
            var queryData = [];
            if(params.team_id instanceof Array) {
                for (var i = 0; i < params.team_id.length; i++) {
                    queryData.push([individual_id, params.team_id[i]]);
                }
            }
            else {
                queryData.push(([individual_id, params.team_id]))
            }
            connection.query(query, [queryData], function(err, result) {
                var query = 'INSERT INTO individual_ability (individual_id, ability_id) VALUES ?;'
                var queryData = [];
                if(params.ability_id instanceof Array) {
                    for (var i = 0; i < params.ability_id.length; i++) {
                        queryData.push([individual_id, params.ability_id[i]]);
                    }
                }
                else {
                    queryData.push(([individual_id, params.ability_id]))
                }
                connection.query(query, [queryData], function(err, result) {
                    var query = 'INSERT INTO individual_threat (individual_id, threat_id) VALUES (?, ?);'
                    var queryData = [individual_id, params.threat_id];
                    connection.query(query, queryData, function(err, result) {
                        callback(err, result);
                    });
                });
            });
        });
    });

};

exports.delete = function(individual_id, callback) {
    var query = 'DELETE FROM individual WHERE individual_id = ?';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE individual SET display_name = ?, first_name = ?, las_name = ? WHERE individual_id = ?';
    var queryData = [params.display_name, params.real_name, params.image_url, params.individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS individual_getinfo;

 DELIMITER //
 CREATE PROCEDURE individual_getinfo (individual_id int)
 BEGIN
 SELECT * FROM individual WHERE individual_id = individual_id;
 SELECT a.*, individual_id FROM address a
 LEFT JOIN individual s on s.address_id = a.address_id;

 END //
 DELIMITER ;

 # Call the Stored Procedure
 CALL individual_getinfo (4);

 */

exports.edit = function(individual_id, callback) {
    var query = 'CALL individual_getinfo(?)';
    var queryData = [individual_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};