const express = require('express')
const Category = require('../models/embedded/categories')   
const router = new express.Router()

//General loading of pages
router.get('/training_registration', async (req, res) => {
    try {
        const categories = await Category.find()
        // res.status(200).send({categories})
        res.render('profile_form', {
            categories: categories
        })
        console.log(categories)
        req.flash('success', 'Categories Gotten')
    } catch (e) {
        res.status(400).send(e.message)
    }
  })
  
  module.exports = router;