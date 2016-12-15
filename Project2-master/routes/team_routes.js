var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');
var individual_dal = require('../model/individual_dal');
// var address_dal = require('../model/address_dal');


// View All teams
router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            console.log(err);
            console.log(result);
            console.log('ERR all');
            res.send(err);
        }
        else {
            res.render('team/viewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.getById(req.query.team_id, function(err,result) {
            team_dal.getMembersById(req.query.team_id, function(err,member) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    // console.log(member)
                    res.render('team/ViewById', {'result': result, 'member': member});
                }
            });
        });
    }
});

router.get('/add', function(req, res){
    team_dal.getAll(function(err,r1) {
        individual_dal.getAll(function(err,r3) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('team/add', {team: r1, individual: r3});
            }
        });
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('Must enter an Name');
    }
    else if(req.query.team_image_url == null) {
        res.send('Must enter an url');
    }
    else {
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.redirect(302, '/team/all');
            }
        });
    }
});


router.get('/delete', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.delete(req.query.team_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/team/all');
            }
        });
    }
});

router.get('/update', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.delete(req.query.team_id, function(err, result){
            team_dal.insertU(req.query, function(err,result) {
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/team/all');
            }
            });
        });
    }
});

router.get('/edit2', function(req, res){
    team_dal.getById(req.query.team_id, function(err,r1) {
        team_dal.getMembersById(req.query.team_id, function(err,r2) {
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
                    res.render('team/update', {team: r1[0], member: r2, individual: r3});
                }
            });
        });
    });
});

module.exports = router;
