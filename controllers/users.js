const userProfile = require('../models/user_profile');

async function userProfileRegistration( req, res ) => {
  

  
    try {
        await user.save()
        const token = await user.generateAuthToken()
  
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
  }