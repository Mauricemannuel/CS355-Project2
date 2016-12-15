var express = require('express');
var router = express.Router();
var individual_dal = require('../model/individual_dal');
var team_dal = require('../model/team_dal');
var ability_dal = require('../model/ability_dal');
// var address_dal = require('../model/address_dal');


// View All individuals
router.get('/all', function(req, res) {
    individual_dal.getAll(function(err, result){
        if(err) {
            console.log(err);
            console.log(result);
            console.log('ERR all');
            res.send(err);
        }
        else {
            res.render('individual/viewAll', { 'result':result });
        }
    });

});

router.get('/good', function(req, res) {
    individual_dal.getGood(function(err, result){
        if(err) {
            console.log(err);
            console.log(result);
            console.log('ERR good');
            res.send(err);
        }
        else {
            res.render('individual/viewGood', { 'result':result });
        }
    });

});

router.get('/bad', function(req, res) {
    individual_dal.getBad(function(err, result){
        if(err) {
            console.log(err);
            console.log(result);
            console.log('ERR bad');
            res.send(err);
        }
        else {
            res.render('individual/viewBad', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.individual_id == null) {
        res.send('individual_id is null');
    }
    else {
        individual_dal.getById(req.query.individual_id, function(err,result) {
            individual_dal.getAbilities(req.query.individual_id, function(err,ability) {
                individual_dal.getTeamsByID(req.query.individual_id, function(err,team) {
                    individual_dal.getAllInTeams(function(err,all) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {

                            res.render('individual/ViewById', {'result': result, 'ability': ability, 'team': team, 'all': all});
                        }
                    });
                });
            });
        });
    }
});

router.get('/add', function(req, res){
    team_dal.getAll(function(err,r1) {
        individual_dal.getThreat(function(err,r2) {
            ability_dal.getAll(function(err,r3) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('individual/Add', {'team': r1, 'threat': r2, 'ability': r3});
                }
            });
        });
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.display_name == null) {
        res.send('Must enter an Name');
    }
    else if(req.query.real_name == null) {
        res.send('Must enter an Name');
    }
    else if(req.query.img_url == null) {
        res.send('Must enter an image url');
    }
    else if(req.query.threat_id == null) {
        res.send('A threat level must be selected');
    }
    else if(req.query.ability_id == null) {
        console.log(ability_id)
        res.send('An ability must be selected');
    }
    else {
        individual_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.redirect(302, '/');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.individual_id == null) {
        res.send('A individual id is required');
    }
    else {
        individual_dal.edit(req.query.individual_id, function(err, result){
            res.render('individual/Update', {individual: result[0][0], address: result[1]});
        });
    }

});

router.get('/update', function(req, res){
    individual_dal.delete(req.query.individual_id, function(err, result){
        console.log('req.query returns: ', req.query);
        individual_dal.insertU(req.query, function(err, result){
            res.redirect(302, '/individual/all');
        });
    });
});

router.get('/delete', function(req, res){
    if(req.query.individual_id == null) {
        res.send('individual_id is null');
    }
    else {
        individual_dal.delete(req.query.individual_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/individual/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.individual_id == null) {
        res.send('A individual id is required');
    }
    else {
        individual_dal.getById(req.query.individual_id, function(err, r1){
            individual_dal.getThreat(function(err,r22) {
            individual_dal.getByIdThreat(req.query.individual_id, function(err,r2) {
                team_dal.getAll(function(err,r3) {
                    console.log("AYO");
                    team_dal.getByIdI(req.query.individual_id, function(err,r4) {
                        ability_dal.getAll(function(err,r5) {
                            ability_dal.getByIdI(req.query.individual_id, function(err,r6) {
                                console.log(r3);
                                res.render('individual/update',
                                    {individual: r1[0],threat: r22, threati: r2,team: r3,ability: r5, teami: r4,abilityi: r6});
                            });
                            });
                        });
                    });
                });
            });
        });
    }
});

module.exports = router;
