var express = require('express');
var router = express.Router();

/* GET Static Pages. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'KodeHauz Training Portal' });
});
router.get('/KodeHauzHub', function (req, res, next) {
  res.render('KodeHauzHub', { title: 'KodeHauz Training Portal' });
});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'KodeHauz Training Portal' });
});
router.get('/signUp', function (req, res, next) {
  res.render('signUp', { title: 'KodeHauz Training Portal' });
});
router.get('/trainer', function (req, res, next) {
  res.render('trainer', { title: 'KodeHauz Training Portal' });
});
router.get('/trainings', function (req, res, next) {
  res.render('trainings', { title: 'KodeHauz Training Portal' });
});

/* GET admin pages. */
router.get('/admin/categories', function (req, res, next) {
  res.render('admin/categories',  { title: 'KodeHauz Training Portal' });
});

router.get('/admin/dashboard', function (req, res, next) {
  res.render('dashboard', { title: 'KodeHauz Training Portal' });
});
router.get('/admin/login', function (req, res, next) {
  res.render('dashboard_login', { title: 'KodeHauz Admin Dashboard Login' });
});
router.get('/admin/sign-up', function (req, res, next) {
  res.render('dashboard_signUp', { title: 'KodeHauz Admin Dashboard Sign Up' });
});

module.exports = router;
