var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');
var individual_dal = require('../model/individual_dal');
var ability_dal = require('../model/ability_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
    individual_dal.getAll(function(err, r1){
        team_dal.getAll(function(err, r2){
            ability_dal.getAll(function(err, r3){
                individual_dal.getById(1, function(err, r4){
                    team_dal.getById(1, function(err, r5){
                        ability_dal.getById(1, function(err, r6){
                            console.log(r4);
                            res.render('index', { title: 'Marvel Cinematic Universe Database',
                                url: 'http://fanboysinc.com/wp-content/uploads/2015/01/marvel-logo.png',
                                'ability_url': 'http://www.williambrucewest.com/wp-content/uploads/2014/0' +
                                '6/marvel_comics_doctor_strange_hd-wallpaper-1395986-the-five-actors-that-' +
                                'could-should-play-marvel-s-doctor-strange.jpeg',
                            'individual': r1, 'team': r2, 'ability': r3, 'f1': r4, 'f2': r5, 'f3': r6});
                        });
                    });
                });
            });
        });
    });
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

module.exports = router;
//
// url: 'http://assets2.ignimgs.com/2013/11/13/marvel-logo-1280jpg-8851ea_1280w.jpg' });