const express = require('express')
const Category = require('../models/embedded/categories')   
const router = new express.Router()

//General loading of pages
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()
        // res.status(200).send({categories})
        res.status(200).render('categories', {
            categories : categories,
            _id: categories._id,
            Category: categories.Category
        })
        // console.log(categories)
        // req.flash('success', 'Categories Gotten')
    } catch (e) {
        res.status(400).send(e.message)
    }
  })
  
  module.exports = router;