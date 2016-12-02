var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res, next) {
  models.Service.findAll().then(function(services) {
    res.json(services);
  });
});
router.post('/', function(req, res, next) {
	console.log(req.body);
	models.Service
      .findOrCreate({
        where: { name: req.body.name },
        defaults: req.body})
      .spread(function(service, created) {
        console.log(service.get({
          plain: true
        }))
        res.json(service);
      });
});

module.exports = router;
