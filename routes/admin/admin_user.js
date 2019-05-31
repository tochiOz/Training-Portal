var express = require('express');
var router = new express.Router();
const Admin = require('../../models/admin');
const { isAdmin } = require('../../middleware/adminAuth')

//admin create user routes
router.post('/signup', async ( req, res ) => {
    const admin = new Admin(req.body)

    if ( admin.email ) {
        req.flash('danger', 'Email exist, Choose another')
    }

    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})
    } catch (err) {
        res.status(400).send(err.message)
    }
});

//getting all admin users
// router.get('/adminUsers')

//login admin
router.post('/login', async (req, res) => {

   
    try {
        const admin = await Admin.findByCredentials( req.body.full_name, req.body.password )
        // return console.log(admin)
        const token = await admin.generateAuthToken()

        res.status(201).send({
            status: 'Success',
            admin,
            token
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}) 

//logout
router.post('/logoutAll', isAdmin, async(req, res) => {
    try {
        
        adminProfile.tokens = []
        await adminProfile.save()
        res.send()
        req.flash('success', 'Thank You for using our Portal')
    } catch (e) {
        res.status(400).send(e.message)
    }
});


//This is used to log-Out from all admin sessions 
router.post('/logout', isAdmin, async (req, res) => {
    try {
        //filtering away the used/active token
        adminProfile.tokens = adminProfile.tokens.filter((token) => {
            return token.token !== adminToken
        })

        await adminProfile.save( )
        res.send()
        req.flash('success', 'Thanks for using our Portal')
    } catch (e) {
        res.status(400).send(e.message)
    }
});

module.exports = router;