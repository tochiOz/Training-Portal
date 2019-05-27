var express = require('express');
var router = new express.Router();
const userReg = require('../models/userReg');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//testing server
router.get('/test', async ( req, res ) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

//creating the user
router.post('/users/create', async ( req, res ) => {
  
  const user = new userReg(req.body)

  try {
      await user.save()
      const token = await user.generateAuthToken()

      res.status(201).send({ user, token })
  } catch (e) {
      res.status(400).send(e.message)
  }
})

module.exports = router;
