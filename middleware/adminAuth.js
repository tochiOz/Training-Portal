const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const isAdmin = async (req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
     
        const decoded = jwt.verify( token, process.env.SECRET )
        // return console.log(decoded)
        // return console.log(decoded._id)
        const admin = await Admin.findOne({ _id: decoded._id})
        // return console.log(admin)
        if ( !admin ) {
            // throw new Error('You are not an Admin')
            throw new Error('invalid User Admin')
            // res.redirect('/admin/login')
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