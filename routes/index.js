var express = require('express');
var router = express.Router();
const Category = require('../models/embedded/categories')
const {isAdmin} = require('../middleware/adminAuth')
const isUser = require('../middleware/userAuth')

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

router.get('/training_registration', async function (req, res, next) {
  try {
    const categories = await Category.find()
    res.status(200).render('profile_form', {
      departments : categories,
     title: 'Training Registration zone'
    })
  } catch (e) {
    res.status(400).send(e.message)
  }
});

router.get('/trainee-profile', isUser, function (req, res, next) {
  res.render('trainee_profile', {
    title: 'Trainee HomePage',
    profile_name: trainee_profile.full_name,
    avatar: trainee_profile.avatar,
    email: trainee_profile.email
  });
});

/* GET admin pages. */
router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Admin Login' })
})

router.get('/admin-departments', isAdmin, async function (req, res, next) {
  try {
    const categories = await Category.find();
    let count = 0;
    res.render('categories', {
      title: 'KodeHauz Training Portal',
      count: count++,
      categories
    });
  } catch (e) {
    res.status(400).send(e.message)
  }
 
});

router.get('/admin-interest-areas', isAdmin, function (req, res, next) {
  res.render('interest-area',  { title: 'KodeHauz Training Portal' });
});

router.get('/admin-skill-levels', isAdmin, function (req, res, next) {
  res.render('skill_levels',  { title: 'KodeHauz Training Portal' });
});

router.get('/admin-dashboard', isAdmin, function (req, res, next) {
  res.render('dashboard', { title: 'KodeHauz Training Portal' });
});

router.get('/dashboard-sign-up', function (req, res, next) {
  res.render('dashboardSignUp', { title: 'Admin Dashboard Sign Up' });
});

module.exports = router;
