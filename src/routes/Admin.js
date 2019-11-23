const express = require('express');
const router = new express.Router();
const admin_controller = require('../controllers/Admin');
const { isAdmin } = require('../middleware/adminAuth');

//admin create user routes
router.post('/admin/signup', admin_controller.createAdmin);

//login admin
router.post('/admin/login', admin_controller.adminLogin);

//logout
router.post('/admin/logoutAll', isAdmin, admin_controller.adminLogout);

module.exports = router;