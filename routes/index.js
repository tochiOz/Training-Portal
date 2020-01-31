var express = require('express');
var router = express.Router();
const { isAdmin } = require('../middleware/adminAuth');
const isUser = require('../middleware/userAuth');
const admin_user = require('./../controllers/AdminUser');
const user_controller = require('../controllers/User');

/* GET Static Pages. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'KodeHauz Training Portal' });
});
router.get('/KodeHauz_Hub', function(req, res, next) {
	res.render('kodehauzHub', { title: 'KodeHauz Training Portal' });
});
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'KodeHauz Training Portal' });
});
router.get('/signUp', function(req, res, next) {
	res.render('signUp', { title: 'KodeHauz Training Portal' });
});
router.get('/trainer', function(req, res, next) {
	res.render('trainer', { title: 'KodeHauz Training Portal' });
});
router.get('/trainings', function(req, res, next) {
	res.render('trainings', { title: 'KodeHauz Training Portal' });
});
router.get('/internship', function(req, res, next) {
	res.render('internship', { title: 'KodeHauz Training Portal' });
});

//get profile form
router.get('/training_registration', user_controller.get_formDetails);

/* GET admin pages. */
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Admin Login' });
});

router.get('/dashboard-sign-up', function(req, res, next) {
	res.render('dashboardSignUp', { title: 'Admin Dashboard Sign Up' });
});

module.exports = router;
