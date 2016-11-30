var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res, next) {
  models.Visitor.findAll().then(function(visitors) {
    res.json(visitors);
  });
});

router.get('/:id', function(req, res, next) {
  models.Visitor
    .findOne({
      where: { id: req.params.id }
    })
    .then(function(visitor) {
      visitor = visitor.get({ plain: true });
      res.json(visitor);
    });
});

router.put('/:id', function(req, res, next) {
  models.Visitor
  .findOne({ where : { id: req.params.id } })
  .then(function(visitor) {
    visitor.update(req.body, { fields: ['firstName', 'lastName', 'location', 'birthDate'] })
      .then(function(visitor) {
        res.json(visitor);
      });
  });
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	models.Visitor
      .findOrCreate({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          secondSurename: req.body.secondSurename,
        },
        defaults: req.body})
      .spread(function(visitor, created) {
        console.log(visitor.get({
          plain: true
        }))
        res.json(visitor);
      });
});

module.exports = router;
