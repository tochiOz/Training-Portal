const express = require('express')
const Category = require('../models/embedded/categories')   
const router = new express.Router()

//General loading of pages
router.get('/deparments', async (req, res) => {
    try {
        const categories = await Category.find()
        // res.status(200).send({categories})
        let categoriesCount = categories.length
        res.status(200).render('categories', {
            categories : categories,
            _id: categories._id,
            Category: categories.Category
        })
        return res.status(200).send({
            categories,
            categoriesCount
        })
        // console.log(categories)
        // req.flash('success', 'Categories Gotten')
    } catch (e) {
        res.status(400).send(e.message)
    }
  })
  
//adding categories for users
router.post('/add_deparments', async (req, res) => {
    const category = new Category(req.body)

    try {
        await category.save()
        res.status(201).send({category})
        
        //send messages
        req.flash('success', 'You have successfully added a new Category')
    } catch (error) {
        console.log(error.message)
        req.flash('danger', 'The category was not added')
    }
})

//categories edit
router.patch('/deparments/edit/:id', async (req, res) => {

    //checking if the sent keys is equilvalent to the stored schema
    const updates = Object.keys(req.body)
    const eligibleEdit = [ 'category', 'description']
    const isValid = updates.every((update) => eligibleEdit.includes(update))

    if ( !isValid ) {
        res.status(404).send('Error: Invalid Category Key')
        return req.flash('danger', 'Invalid Category Key')
    }

    //querying the db,to get the picked id
    const _id = req.params.id

    //storing the editted category
    try {
        const updatedCategory = await Category.findOne({ _id })
        if( !updatedCategory ) return res.status(404).send('Category not found')

        updates.forEach((update) => updatedCategory[update] = req.body[update])

        await updatedCategory.save()

        res.status(200).send({updatedCategory})
        req.flash('success', 'Category Updated Successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


//delete categories 
router.delete('/deparments/delete/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const deletedCategory = await Category.findByIdAndDelete({ _id })

        if ( !deletedCategory ) {
            res.flash('danger', 'Category not Deleted')
            res.statas(404).send({ Error: 'Category not found'})
        }

        res.send(deletedCategory)
    } catch (error) {
        res.statas(400).send(error.message)
    }
})

module.exports = router;