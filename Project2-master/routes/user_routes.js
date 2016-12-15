var express = require('express');
var router = express.Router();
var user_dal = require('../model/user_dal');
var team_dal = require('../model/team_dal');
var individual_dal = require('../model/individual_dal');
var ability_dal = require('../model/ability_dal');


router.get('/login', function(req, res) {
    user_dal.logIn(req.query, function (err, user) {
        individual_dal.getAll(function(err, r1){
            team_dal.getAll(function(err, r2){
                ability_dal.getAll(function(err, r3){
                    res.render('index', { title: 'Marvel Cinematic Universe Database',
                        url: 'http://fanboysinc.com/wp-content/uploads/2015/01/marvel-logo.png',
                        'ability_url': 'http://www.williambrucewest.com/wp-content/uploads/2014/0' +
                        '6/marvel_comics_doctor_strange_hd-wallpaper-1395986-the-five-actors-that-' +
                        'could-should-play-marvel-s-doctor-strange.jpeg',
                        'individual': r1, 'team': r2, 'ability': r3, 'user': user});
                });
            });
        });
    });
});
router.get('/signin', function(req, res) {

});
module.exports = router;