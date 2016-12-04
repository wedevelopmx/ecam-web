var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user) {
			res.render('index', { title: 'eCAM' });
    } else {
      //res.redirect('/login');
			res.render('login', { title: 'eCAM' });
    }
});

module.exports = router;
