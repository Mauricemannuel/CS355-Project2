var express = require('express');
var router = express.Router();
var individual_dal = require('../model/individual_dal');
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
                            console.log(team);
                            res.render('individual/ViewById', {'result': result, 'ability': ability, 'team': team, 'all': all});
                        }
                    });
                });
            });
        });
    }
});

router.get('/add', function(req, res){
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('individual/Add', {'address': result});
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.display_name == null) {
        res.send('A first name must be provided.');
    }
    else if(req.query.real_name == null) {
        res.send('A last name must be selected');
    }
    else {
        individual_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.redirect(302, '/individual/all');
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

router.get('/edit2', function(req, res){
    if(req.query.individual_id == null) {
        res.send('A individual id is required');
    }
    else {
        individual_dal.getById(req.query.individual_id, function(err, individual){
            res.render('individual/Update', {individual: individual[0]});
        });
    }

});

router.get('/update', function(req, res){
    individual_dal.update(req.query, function(err, result){
        res.redirect(302, '/individual/all');
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

module.exports = router;
