const express = require('express');
const router = new express.Router();
const admin_controller = require('../controllers/AdminSkills');
const { isAdmin } = require('../middleware/adminAuth');

//add skills
router.post('/admin/add-skill-level', isAdmin, admin_controller.addSkills);

//categories edit
router.put('/admin/skill-level/edit', isAdmin, admin_controller.update_skills);

//delete categories 
router.delete('/admin/utlity/apiSki/delete', isAdmin, admin_controller.deleteSkills);

module.exports = router;