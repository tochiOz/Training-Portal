var express = require('express');
var router = express.Router();
const {isAdmin} = require('../middleware/adminAuth')
const isUser = require('../middleware/userAuth')
const admin_controller = require('../controllers/admin')
const user_controller = require('../controllers/user')

/* GET Static Pages. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'KodeHauz Training Portal' });
});
router.get('/KodeHauz_Hub', function (req, res, next) {
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
router.get('/internship', function (req, res, next) {
  res.render('internship', { title: 'KodeHauz Training Portal' });
});

//get profile form
router.get('/training_registration', user_controller.get_formDetails)

//get trainee Profile
router.get('/trainee-profile', isUser, user_controller.get_trainee_profile);

/* GET admin pages. */
router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Admin Login' })
})

//GET admin Trainees
router.get('/dashboard-trainees', isAdmin, user_controller.get_total_trainees)

//get admin categories
router.get('/admin-departments', isAdmin, admin_controller.get_categories)

//get admin interest-areas
router.get('/admin-interest-areas', isAdmin, admin_controller.get_interest_area);

//get admin skill levels
router.get('/admin-skill-levels', isAdmin, admin_controller.get_Skills);

router.get('/admin-dashboard', isAdmin, function (req, res, next) {
  res.render('dashboard', { title: 'KodeHauz Training Portal' });
});

router.get('/dashboard-sign-up', function (req, res, next) {
  res.render('dashboardSignUp', { title: 'Admin Dashboard Sign Up' });
});

module.exports = router;
