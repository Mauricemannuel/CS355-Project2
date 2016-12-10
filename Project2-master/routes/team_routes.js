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

module.exports = router;
