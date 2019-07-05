const jwt = require('jsonwebtoken');
const User = require('../models/trainee_profile');

let isUser;
isUser = async (req, res, next) => {
    // return console.log('this is me ' + req.cookies.admin_jwt)
    try {
        if ((req.cookies.jwt === undefined || null) && (req.cookies.admin_jwt === undefined || null)) {
            return res.redirect('/');
        }
        
        //for user access
        if (req.cookies.jwt ) {
            const token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.SECRET);
            const trainee = await User.findOne({ _id: decoded._id });
            // return console.log(trainee)
            if (!trainee) {
                throw new Error('Profile Doesn\'t Exist');
            }

            trainee_profileToken = token;
            trainee_profile = trainee;

        } else if (req.cookies.admin_jwt && ( req.cookies.jwt === undefined || null )) {
            const _id = req.query.id
            const trainee = await User.findOne({ _id })

            trainee_profile = trainee;
        }

        return next();
    }
    catch (error) {
        res.redirect('/');
    }
};

module['exports'] = isUser;