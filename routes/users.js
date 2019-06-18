var express = require('express');
var router = new express.Router();
const Trainee = require('../models/trainee_profile')
const sharp = require('sharp')
const cloudinary = require('cloudinary')
const upload = require('../config/upload')
const Datauri = require('datauri')
const path = require('path')
const isUser = require('../middleware/userAuth')
require('../config/cloudinary')
const dUri = new Datauri();
const Education = require('../models/trainee_education')
const Skill = require('../models/trainee_skill')
const Internet = require('../models/internet')

//testing server
router.get('/test', async (req, res) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

// //creating the user
router.post('/student/create', upload.single('avatar'), async (req, res) => {

  try {

    const buffer = await sharp(req.file.buffer).resize({
      width: 200, height: 200
    }).png().toBuffer()

    const dataUri = dUri.format(path.extname(req.file.originalname).toString(), buffer);
    const imageFile = dataUri.content;

    const image = await cloudinary.v2.uploader.upload(imageFile)

    const trainee = new Trainee({
      full_name: req.body.full_name,
      email: req.body.email,
      gender: req.body.gender,
      phone_number: req.body.phone_number,
      address: req.body.address,
      avatar: image.secure_url,
      password: req.body.password
    })

    await trainee.save()

    //ex tracting the user_id
    const userId = trainee._id

    //creating new instance of educational table
    const trainee_education = new Education({
      school: req.body.school,
      academic_disciple: req.body.academic_disciple,
      academic_status: req.body.academic_status,
      trainee_id: userId,
    })

    await trainee_education.save()

    //creating new instance of internet details 
    const training_skill = new Skill({
      programming_skill: req.body.programming_skill,
      teaching_experience: req.body.teaching_experience,
      skillLevel_id: req.body.skillLevel_id,
      trainee_id: userId,
    })

    await training_skill.save()


    //creating new instance of programming skill
    const training_internet_account = new Internet({
      account_name: req.body.account_name,
      account_password: req.body.account_password,
      trainee_id: userId,
    })

    await training_internet_account.save()

    const token = await trainee.generateAuthToken()
    res.status(201).send({ trainee, trainee_education, training_skill, training_internet_account, token })


  } catch (e) {
    res.status(400).send(e.message)

    console.log(e.message)
  }
})

//POST Trainee Login
router.post('/student/login', async (req, res) => {

  try {
    const trainee = await Trainee.findByCredentials(req.body.email, req.body.password)
    const token = await trainee.generateAuthToken()
    res.cookie('jwt', token, { maxAge: 400000000 })

    // res.status(200).send({
    //   status: 'Success',
    //   trainee,
    //   token
    // })
    return res.redirect('/trainee-profile')
  } catch (e) {
    res.status(500).send(e.message)
  }
})

//get Profile for user details only
//Will still load other files
router.get('/student/me', isUser, async (req, res) => {
  if (trainee_profile) {
    if (trainee_profile.tokens == '') {
      res.status(404).send({ Error: 'Please Trainee must be signed in' })
      return req.flash('danger', 'Please sign IN!!!')
    }

    res.status(200).send(trainee_profile)
  }

})

//PATCH trainee can edit his profile
router.patch('/student/me/edit_profile-info', isUser, async (req, res) => {

  const updates = Object.keys(req.body)
  const eligibleUpdateKeys = ['email', 'full_name', 'phone_number', 'address']
  const isValid = updates.every((update) => eligibleUpdateKeys.includes(update))

  if (!isValid) {
    return res.status(404).send({ Error: 'Invalid Key Update' })
  }

  try {
    updates.forEach((update) => trainee_profile[update] = req.body[update])
    await trainee_profile.save()

    res.status(200).send({
      Update: 'Details updated Succefully',
      trainee_profile
    })
    return req.flash('success', 'Personal Profile Updated successfully')
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

//PATCH update profile picture
router.patch('/student/me/update-profile-picture', isUser, async (req, res) => {

})

//logout
router.post('/logoutAll', isUser, async (req, res) => {
  try {

    trainee_profile.tokens = []
    await trainee_profile.save()
    res.clearCookie('jwt')
    req.flash('success', 'Thank You for using our Portal')
    return res.redirect('/')
  } catch (e) {
    res.status(400).send(e.message)
  }
});

module.exports = router;
