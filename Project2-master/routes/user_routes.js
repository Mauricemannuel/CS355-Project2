var express = require('express');
var router = express.Router();
var user_dal = require('../model/user_dal');
var team_dal = require('../model/team_dal');
var individual_dal = require('../model/individual_dal');
var ability_dal = require('../model/ability_dal');


router.get('/loggedIn', function(req, res) {
    user_dal.Who(req.query, function (err, user) {
        res.render(304, { user: user});
    });
});
router.get('/signin', function(req, res) {

});
module.exports = router;