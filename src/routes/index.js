const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/AdminAuth');
const isUser = require('../middleware/UserAuth');
const user_controller = require('../controllers/User');

/* GET Static Pages. */

router.get('/admin/signUp', function(res) {
	res.render('dashboardSignup', { title: 'Admin Dashboard Sign Up' });
});
router.get('/admin/login', function(res) {
	res.render('dashboardLogin', { title: 'KodeHauz Training Portal' });
});
router.get('/', function(res) {
	res.render('index', { title: 'KodeHauz Training Portal' });
});
router.get('/KodeHauz_Hub', function(res) {
	res.render('kodehauzHub', { title: 'KodeHauz Training Portal' });
});
router.get('/trainer', function(res) {
	res.render('trainer', { title: 'KodeHauz Training Portal' });
});
router.get('/trainings', function(res) {
	res.render('trainings', { title: 'KodeHauz Training Portal' });
});
router.get('/internship', function(res) {
	res.render('internship', { title: 'KodeHauz Training Portal' });
});
//get profile form
router.get('/training_registration', user_controller.get_formDetails);

//get profile for paystack
router.get('/activation', isUser, user_controller.get_trainee_paystack);

//get trainee Profile
router.get('/trainee-profile', isUser, user_controller.get_trainee_profile);

/* GET admin pages. */
// router.get('/login', function(res) {
// 	res.render('login', { title: 'Admin Login' });
// });

//GET admin Trainees
router.get('/dashboard-trainees', isAdmin, user_controller.get_trainings);

//GET admin Interns
router.get('/dashboard-interns', isAdmin, user_controller.get_interns);

//GET admin Hub users
router.get('/dashboard-hub', isAdmin, user_controller.get_hub);

//GET admin Traine the Trainer
router.get('/dashboard-trainer', isAdmin, user_controller.get_trainer);

router.get('/admin-dashboard', isAdmin, function(res) {
	res.render('dashboard', { title: 'KodeHauz Training Portal' });
});

module.exports = router;
