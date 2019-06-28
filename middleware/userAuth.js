const jwt = require('jsonwebtoken');
const User =  require('../models/trainee_profile');

let isUser;
isUser = async (req, res, next) => {
    try {
        if (!req.cookies.jwt || !req.cookies.admin_jwt) {
            return res.redirect('/');
        }

        //for user access
        if (req.cookies.jwt) {
            const token = req.cookies.jwt;
            const decoded = jwt.verify(token, process.env.SECRET);
            const trainee = await User.findOne({_id: decoded._id});

            if (!trainee) {
                throw new Error('Profile Doesn\'t Exist');
            }

            trainee_profileToken = token;
            trainee_profile = trainee;
        }
        else if (req.cookies.admin_jwt) {
            return
        }

        return next();
    }
    catch (error) {
        res.redirect('/');
    }
};

module['exports'] = isUser;