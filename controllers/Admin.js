const Admin = require('../models/Admin');

module.exports = {
	async createAdmin(req, res) {
		const { full_name, email, password } = req.body;
		try {
			// let errors = [];

			// if (!full_name || !email || !password) errors.push({ msg: 'Plese fill in all field' });
			// if (password.length < 6) errors.push({ msg: 'Passwords Must not be less than 6' });
			// // if( adminEmailCheck) errors.push({ msg: 'Email already Exist'});

			// if (errors.length > 0) {
			// 	res.render('dashboardSignup', {
			// 		errors,
			// 		full_name,
			// 		email,
			// 		password
			// 	});
			// } else if (condition) {
			// } else {
			const admin = new Admin(req.body);
			try {
				await admin.save();
				const token = await admin.generateAuthToken();
				res.cookie('admin_jwt', token, { maxAge: 400000000 });
				return res.redirect('/admin/login');
			} catch (err) {
				console.log(err);
				res.status(400).send(err.message);
				// }
			}
		} catch (e) {
			return res.status(500).send({ error: 'Message not found' });
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
				return res.redirect('/admin/login');
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
			return res.redirect('/');
		} catch (e) {
			res.status(400).send(e.message);
		}
	}
};
