var express = require('express');
var router = new express.Router();
const User = require('../models/user_profile')
const multer = require('multer')
const sharp = require('sharp')

//testing server
router.get('/test', async ( req, res ) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

//creating the user
router.post('/users/create', async ( req, res ) => {
  // return console.log(req.body)
  const user = new User(req.body)
  // return console.log(user)
  try {
     
      await user.save()
      const token = await user.generateAuthToken()

      res.status(201).send({ user, token })
  } catch (e) {
      res.status(400).send(e.message)
  }
})

module.exports = router;
