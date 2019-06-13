var express = require('express');
var router = new express.Router();
const Admin = require('../../models/admin');
const { isAdmin } = require('../../middleware/adminAuth')
// const cookie = require('js-cookie')

//admin create user routes
router.post('/signup', async ( req, res ) => {
    const admin = new Admin(req.body)

    const adminEmailCheck = await Admin.findEmail( req.body.email )

    if (adminEmailCheck) {
        return res.status(400).send({message:  `${adminEmailCheck.email} already exist` })
    }

    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})
        req.flash('sucess', `You Have Sucessfully Created an Admin Account`)

        // return res.redirect('/login')
    } catch (err) {
        res.status(400).send(err.message)
    }
});

//getting all admin users
// router.get('/adminUsers')

//login admin
router.post('/login', async (req, res) => {
// return res.status(200).send(req.body.full_name + 'hjhjjhj')
   
    try {
        const admin = await Admin.findByCredentials( req.body.email, req.body.password )
        const token = await admin.generateAuthToken()

        res.cookie('jwt', token, {maxAge: 400000000})
        req.flash('sucess', `You Have Sucessfully Logged In Admin ${admin.email}`)

        return res.redirect('/admin-dashboard')
    } catch (e) {
        if (e) {
            req.flash('danger', 'You are not Authorised')
            return res.redirect('/login')
        }
    }
}) 

//logout
router.post('/logoutAll', isAdmin, async(req, res) => {
    try {
        
        adminProfile.tokens = []
        await adminProfile.save()
        res.clearCookie('jwt')
        req.flash('success', 'Thank You for using our Portal')
        return res.redirect('/')
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