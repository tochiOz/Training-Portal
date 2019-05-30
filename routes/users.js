var express = require('express');
var router = new express.Router();
const User = require('../models/user_profile')
const sharp = require('sharp')
const cloudinary = require('cloudinary')
const upload = require('../config/upload')
const Datauri = require('datauri')
const path = require('path')
require('../config/cloudinary')
const dUri = new Datauri();

//testing server
router.get('/test', async ( req, res ) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

// router.post('/upload', upload.single('avatar'), async(req, res) => {
  
//   try {
//     const buffer = await sharp(req.file.buffer).resize({
//       width: 250, height: 250
//     }).png().toBuffer()
    
//     const dataUri = dUri.format(path.extname(req.file.originalname).toString(), buffer);
//     const imageFile = dataUri.content;
   
//     const image = await cloudinary.v2.uploader.upload(imageFile)
    
//     const user = User.avatar = image

//     user.save()
//     res.status(200).send({user})
//   } catch (error) {
//     res.status(400).send(error.message)
//   }
// })

// //creating the user
router.post('/users/create', upload.single('avatar'), async ( req, res ) => {

  try {

        const buffer = await sharp(req.file.buffer).resize({
          width: 250, height: 250
        }).png().toBuffer()
        
        const dataUri = dUri.format(path.extname(req.file.originalname).toString(), buffer);
        const imageFile = dataUri.content;
      
        const image = await cloudinary.v2.uploader.upload(imageFile)
      
        const user = new User({
            full_name : req.body.full_name,
            email: req.body.email,
            gender: req.body.gender,
            phone_number: req.body.phone_number,
            address: req.body.address,
            avatar: image.secure_url,
            password: req.body.password
        }) 

        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
      
      
  } catch (e) {
      res.status(400).send(e.message)
      
      console.log(e.message)
  }
})



module.exports = router;
