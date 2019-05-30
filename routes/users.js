var express = require('express');
var router = new express.Router();
const User = require('../models/user_profile')
const sharp = require('sharp')
const cloudinary = require('cloudinary')
const upload = require('../config/upload')
const Datauri = require('datauri')
const path = require('path')
const isUser = require('../middleware/userAuth')
require('../config/cloudinary')
const dUri = new Datauri();

//testing server
router.get('/test', async ( req, res ) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

// //creating the user
router.post('/student/create', upload.single('avatar'), async ( req, res ) => {

  try {

        const buffer = await sharp(req.file.buffer).resize({
          width: 250, height: 250
        }).png().toBuffer()
        
        const dataUri = dUri.format(path.extname(req.file.originalname).toString(), buffer);
        const imageFile = dataUri.content;
      
        const image = await cloudinary.v2.uploader.upload(imageFile)
      
        const trainee = new User({
            full_name : req.body.full_name,
            email: req.body.email,
            gender: req.body.gender,
            phone_number: req.body.phone_number,
            address: req.body.address,
            avatar: image.secure_url,
            password: req.body.password
        }) 

        await trainee.save()
        const token = await trainee.generateAuthToken()
        res.status(201).send({ trainee, token })
      
      
  } catch (e) {
      res.status(400).send(e.message)
      
      console.log(e.message)
  }
})

//POST Trainee Login
router.post('/student/login', async ( req, res ) => {

  try {
    const trainee = await User.findByCredentials( req.body.email, req.body.password )
    // return console.log(admin)
    const token = await trainee.generateAuthToken()

    res.status(200).send({
        status: 'Success',
        trainee,
        token
    })
  } catch (e) {
      res.status(500).send(e.message)
  }
})

//get Profile for user details only
//Will still load other files
router.get('/student/me', isUser, async ( req, res ) => {
  if(trainee_profile ) {
    if( trainee_profile.tokens == '' ) {
      res.status(404).send({ Error: 'Please Trainee must be signed in'})
      return req.flash('danger', 'Please sign IN!!!')
    }

    res.status(200).send(trainee_profile)
  }
    
})

//PATCH trainee can edit his profile
router.patch('/student/me/edit_profile-info', isUser, async ( req, res ) => {

  const updates = Object.keys(req.body)
  const eligibleUpdateKeys = [ 'email', 'full_name', 'phone_number', 'address']
  const isValid = updates.every((update) => eligibleUpdateKeys.includes(update))

  if( !isValid ) {
    return res.status(404).send({ Error: 'Invalid Key Update'})
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

//logout a single session for a trainee
router.post('/student/logout', isUser, async ( req, res ) => {
    try {
      
      trainee_profile.tokens = []

      await trainee_profile.save()
      res.send()
      req.flash('success', 'You have successfully Logged out of the portal')
    } catch (error) {
      res.status(401).send(error.message)
    }
})

module.exports = router;
