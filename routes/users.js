var express = require('express');
var router = new express.Router();
const upload = require('../services/upload');
const user_controller = require('../controllers/User');
const isUser = require('../middleware/userAuth');
const captcha = require('../services/reCaptcha');

//testing server
router.get('/test', async (req, res) => {
	res.send('We are just Testing \nThis is just a DRILL!!!.....');
});

// //creating the user
router.post('/trainee/profile/create', upload.single('avatar'), user_controller.trainee_SignUp);

//POST Trainee Login
router.post('/trainee/profile/login', user_controller.trainee_login);

//PATCH trainee can edit his profile
router.patch('/trainee/profile/me/edit_profile-info', isUser, user_controller.edit_trainee_profile);

//PATCH trainee can edit his profile
router.patch('/trainee/profile/me/edit_profile_education', isUser, user_controller.edit_trainee_education_profile);

//PATCH update profile picture
router.patch('/trainee/profile/me/update-profile-picture', isUser, user_controller.edit_trainee_profile_avatar);

//logout
router.post('/trainee/logoutAll', isUser, user_controller.trainee_logout);

module.exports = router;
