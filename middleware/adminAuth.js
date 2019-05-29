const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')

const adminAuth = async (req, res, next ) => {
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

const isAdmin =  function ( req, res, next ) {
    $axios.onRequest(config => {
        config.headers.common['user_type'] = store.state.auth.user ? store.state.auth.user.user_type : null
    })
 }

module.exports = {
    adminAuth,
    isAdmin
}