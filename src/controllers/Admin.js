const Admin = require('../models/Admin');

module.exports = {
    async createAdmin(req, res) {
        const admin = new Admin(req.body);

        const adminEmailCheck = await Admin.findEmail(req.body.email);

        // return console.log(adminEmailCheck)
        if (adminEmailCheck) {
            return res.status(400).send({ message: `${adminEmailCheck.email} already exist` })
        } else {
            try {
                await admin.save()
                // const token = await admin.generateAuthToken()
                // res.cookie('admin_jwt', token, { maxAge: 400000000 });
                return res.redirect('/login');
            } catch (err) {
                console.log(err)
                res.status(400).send(err.message)
            }      
        }      
    },

    async adminLogin(req, res) {

        try {
            const admin = await Admin.findByCredentials(req.body.email, req.body.password);
            const token = await admin.generateAuthToken();

            res.cookie('admin_jwt', token, { maxAge: 400000000 });
            req.flash('sucess', `You Have Sucessfully Logged In Admin ${admin.email}`);

            return res.redirect('/admin-dashboard');
        } catch (e) {
            if (e) {
                return res.redirect('/login')
            }
        }
    },

    //admin logging out
    async adminLogout(req, res) {
        try {
            adminProfile.tokens = [];
            await adminProfile.save();
            res.clearCookie('admin_jwt');
            req.flash('success', 'Thank You for using our Portal');
            return res.redirect('/')
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}