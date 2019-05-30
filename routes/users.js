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
  
  res.status(200).send(trainee_profile)
})

//logout a single session for a trainee
router.post('/student/logout', isUser, async ( req, res ) => {
    try {
      
      trainee_profile.tokens = trainee_profile.tokens.filter((token) => {
        return token.token !== trainee_profileToken
      })

      await trainee_profile.save()
      res.send()
      req.flash('success', 'You have successfully Logged out of the portal')
    } catch (error) {
      res.status(401).send(error.message)
    }
})

module.exports = router;
