var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');
var individual_dal = require('../model/individual_dal');
var ability_dal = require('../model/ability_dal');


// View All teams
router.get('/all', function(req, res) {
    ability_dal.getAll(function(err, result){
        if(err) {
            console.log(err);
            console.log(result);
            console.log('ERR all');
            res.send(err);
        }
        else {
            res.render('ability/viewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.ability_id == null) {
        res.send('ability_id is null');
    }
    else {
        ability_dal.getById(req.query.ability_id, function(err,result) {
            ability_dal.getPoweredPeople(req.query.ability_id, function(err,individual) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    // console.log(member)
                    res.render('ability/ViewById', {'result': result, 'individual': individual});
                }
            });
        });
    }
});

router.get('/add', function(req, res){
        individual_dal.getAll(function(err,r3) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('ability/add', {individual: r3});
            }
        });
});

router.get('/insert', function(req, res){
    if(req.query.ability_name == null) {
        res.send('Must enter an Name');
    }
    else if(req.query.description == null) {
        res.send('Must enter a description');
    }
    else {
        ability_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.redirect(302, '/ability/all');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.ability_id == null) {
        res.send('ability_id is null');
    }
    else {
        ability_dal.delete(req.query.ability_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/ability/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    if(req.query.ability_id == null) {
        res.send('ability_id is null');
    }
    else {
        ability_dal.delete(req.query.ability_id, function(err, result){
            ability_dal.insertU(req.query, function(err,result) {
                if(err) {
                    res.send(err);
                }
                else {
                    res.redirect(302, '/ability/all');
                }
            });
        });
    }
});

router.get('/edit2', function(req, res){
    ability_dal.getById(req.query.ability_id, function(err,r1) {
        ability_dal.getPoweredPeople(req.query.ability_id, function(err,r2) {
            individual_dal.getAll(function(err,r3) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log("R1:\n");
                    console.log(r1);
                    console.log("R2:\n");
                    console.log(r2);
                    console.log("R3:\n");
                    console.log(r3);
                    res.render('ability/update', {ability: r1[0], member: r2, individual: r3});
                }
            });
        });
    });
});






module.exports = router;
