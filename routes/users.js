var express = require('express');
var router = new express.Router();
const upload = require('../config/upload')
const user_controller = require('../controllers/user')
const isUser = require('../middleware/userAuth')

//testing server
router.get('/test', async (req, res) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

// //creating the user
router.post('/student/create', upload.single('avatar'), user_controller.trainee_SignUp)

//POST Trainee Login
router.post('/student/login', user_controller.trainee_login)

//PATCH trainee can edit his profile
router.patch('/student/me/edit_profile-info', isUser, )

//PATCH update profile picture
router.patch('/student/me/update-profile-picture', isUser, user_controller.edit_trainee )

//logout
router.post('/logoutAll', isUser, user_controller.trainee_logout);

module.exports = router;
