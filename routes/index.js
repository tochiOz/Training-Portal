var express = require('express');
var router = express.Router();

/* GET Static Pages. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kodehauz Training Portal' });
});
router.get('/kodehauzHub', function(req, res, next) {
  res.render('kodehauzHub', { title: 'Kodehauz Training Portal' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Kodehauz Training Portal' });
});
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'Kodehauz Training Portal' });
});
router.get('/trainer', function(req, res, next) {
  res.render('trainer', { title: 'Kodehauz Training Portal' });
});
router.get('/trainings', function(req, res, next) {
  res.render('trainings', { title: 'Kodehauz Training Portal' });
});

/* GET admin pages. */
router.get('/admin/categories', function(req, res, next) {
  res.render('admin/categories');
});

module.exports = router;
