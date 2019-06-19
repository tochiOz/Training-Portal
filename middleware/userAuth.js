const jwt = require('jsonwebtoken')
const User =  require('../models/trainee_profile')

const isUser = async (req, res, next ) => {
    try {
        if (!req.cookies.jwt) {
            return res.redirect('/')
        }
        const token = req.cookies.jwt;
        // return console.log(token)
        const decoded = jwt.verify(token, process.env.SECRET)
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