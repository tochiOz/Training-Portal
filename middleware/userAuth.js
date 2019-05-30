const jwt = require('jsonwebtoken')
const User =  require('../models/user_profile')

const isUser = async (req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify( token, process.env.SECRET )

        const trainee = await User.findOne({ _id: decoded._id })
        // return console.log(trainee_profile )

        if ( !trainee ) {
            throw new Error('Profile Doesn\'t Exist')
        }

        trainee_profileToken = token
        trainee_profile = trainee

        next()
    } catch (error) {
        res.status(401).send({ Error: 'Please Make Sure You Inputted The Right Details!!!'})
    }
}

module.exports = isUser;