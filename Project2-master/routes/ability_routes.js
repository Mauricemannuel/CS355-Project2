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

module.exports = router;
