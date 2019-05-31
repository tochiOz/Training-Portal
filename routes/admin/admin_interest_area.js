const express = require('express')
const router = new express.Router()
const Interest_Area = require('../../models/embedded/interest_area');
const { isAdmin } = require('../../middleware/adminAuth')

//adding categories for users
router.post('/add-interest-area', isAdmin, async (req, res) => {
    const interest = new Interest_Area(req.body)

    try {
        await interest.save()
        res.status(201).send({interest})
        
        //send messages
        req.flash('success', 'You have successfully added a new Interest-Area')
    } catch (error) {
        console.log(error.message)
        req.flash('danger', 'The Interest-Area was not added')
    }
})

router.get('/view-interest-area', isAdmin, async (req, res) => {
    try {
        const interests = await Interest_Area.find()
        res.status(200).send({interests})
        // res.render('admin/categories', categories);
        req.flash('success', 'Interest-Areas Gotten')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//categories edit
router.patch('/interest-area/edit/:id', isAdmin, async (req, res) => {

    //checking if the sent keys is equilvalent to the stored schema
    const updates = Object.keys(req.body)
    const eligibleEdit = [ 'interest', 'description']
    const isValid = updates.every((update) => eligibleEdit.includes(update))

    if ( !isValid ) {
        res.status(404).send('Error: Invalid Interest-Area Key')
        return req.flash('danger', 'Invalid Interest-Area Key')
    }

    //querying the db,to get the picked id
    const _id = req.params.id

    //storing the editted category
    try {
        const updatedinterest = await Interest_Area.findOne({ _id })
        if( !updatedinterest ) return res.status(404).send('Interest-Area not found')

        updates.forEach((update) => updatedinterest[update] = req.body[update])

        await updatedinterest.save()

        res.status(200).send({updatedinterest})
        req.flash('success', 'Interest-Area Updated Successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


//delete categories 
router.delete('/interest-area/delete/:id', isAdmin, async (req, res) => {
    const _id = req.params.id

    try {
        const deletedInterest = await Interest_Area.findByIdAndDelete({ _id })

        if ( !deletedInterest ) {
            res.flash('danger', 'Interest-Area not Deleted')
            res.status(404).send({ Error: 'Interest-Area not found'})
        }

        res.send(deletedInterest)
    } catch (error) {
        res.statas(400).send(error.message)
    }
})

module.exports = router;