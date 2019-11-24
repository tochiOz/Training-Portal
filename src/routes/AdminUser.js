const express = require('express');
const router = new express.Router();
const admin_controller = require('../controllers/AdminUser');
const { isAdmin } = require('../middleware/AdminAuth');

//get trainee profile
// router.get('/admin/view/profile', isUser, admin_controller.view_user_profile );

//delete users
router.delete('/admin/delete/user', isAdmin, admin_controller.delete_user);

module.exports = router;