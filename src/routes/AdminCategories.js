const express = require('express');
const router = new express.Router();
const admin_controller = require('../controllers/AdminCategories');
const { isAdmin } = require('../middleware/adminAuth');

//adding categories for users
router.post('/admin/add_categories', isAdmin, admin_controller.add_categories);

//categories edit
router.put('/admin/categories/edit', isAdmin, admin_controller.update_categories);

//delete categories 
router.delete('/admin/utlity/apiCat/delete', isAdmin, admin_controller.delete_categories);

module.exports = router;