var express = require('express');
var router = new express.Router();

//testing server
router.get('/test', async ( req, res ) => {
  res.send('We are just Testing \nThis is just a DRILL!!!.....')
})

//creating the user
router.post('/users/create', )

module.exports = router;
