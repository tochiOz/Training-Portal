var express = require('express');
var router = new express.Router();
const Admin = require('../models/admin');
const { isAdmin } = require('../middleware/adminAuth')
const admin_controller = require('../controllers/admin')

//admin create user routes
router.post('/signup', admin_controller.createAdmin);

//login admin
router.post('/login', admin_controller.adminLogin) 

//logout
router.post('/logoutAll', isAdmin, admin_controller.adminLogout);

//add skills
router.post('/add-skill-level', isAdmin, admin_controller.addSkills)

//categories edit
router.patch('/skill-level/edit/:id', isAdmin, admin_controller.update_skills)

//delete categories 
router.delete('/skill-level/delete/:id', isAdmin, admin_controller.deleteSkills)

//adding categories for users
router.post('/add_categories', isAdmin, admin_controller.add_categories)

//categories edit
router.patch('/categories/edit/:id', isAdmin, admin_controller.update_categories)


//delete categories 
router.delete('/categories/delete/:id', isAdmin, admin_controller.delete_categories)

//adding interest areas for users
router.post('/add-interest-area', isAdmin, admin_controller.add_interest_area)

//interest areas edit
router.patch('/interest-area/edit/:id', isAdmin, admin_controller.update_interest_area)


//delete interest areas for users
router.delete('/interest-area/delete/:id', isAdmin, admin_controller.delete_interest_area )

module.exports = router;