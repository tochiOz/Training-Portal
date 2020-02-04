const jsonwebtoken = require('jsonwebtoken');
const Admin = require('../models/Admin');
const keys = require('./../config/keys');

const isAdmin = async (req, res, next) => {
	try {
		if (!req.cookies.admin_jwt) {
			return res.redirect('/admin/login');
		}
		const token = req.cookies.admin_jwt;
		const decoded = jsonwebtoken.verify(token, keys.SECRET);
		const admin = await Admin.findOne({ _id: decoded._id });
		if (!admin) {
			return res.redirect('/admin/login');
		}

		adminToken = token;
		adminProfile = admin;

		next();
	} catch (error) {
		res.status(401).send(error.message);
	}
};

module.exports = isAdmin;
