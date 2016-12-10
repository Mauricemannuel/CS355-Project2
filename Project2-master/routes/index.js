var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Marvel Cinematic Universe Database',
        url: 'http://assets2.ignimgs.com/2013/11/13/marvel-logo-1280jpg-8851ea_1280w.jpg' });
});

module.exports = router;
