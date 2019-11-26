const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');
const keys = require('./../../config/keys');

const isAdmin = async (req, res, next ) => {
    try {
        if (!req.cookies.admin_jwt) {
            return res.redirect('/login')
        }
        const token = req.cookies.admin_jwt;
        // return console.log(token)
        const decoded = jwt.verify( token, keys.SECRET )
        // return console.log(decoded)
        // return console.log(decoded._id)
        const admin = await Admin.findOne({ _id: decoded._id})
        // return console.log(admin)
        if ( !admin ) {
            return res.redirect('/login')
        }
        
        adminToken = token
        adminProfile = admin

        next()
    } catch (error) {
        res.status(401).send(error.message)
    }
}

const  adminAuth = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.user.admin == 1) {
        next();
    } else {
        req.flash('danger', 'Please log in as admin.');
        res.redirect('/users/login');
    }
}

module.exports = {
    adminAuth,
    isAdmin
}