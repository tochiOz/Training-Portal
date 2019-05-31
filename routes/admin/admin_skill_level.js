const express = require('express')
const router = new express.Router()
const Skills = require('../../models/embedded/skill_level');
const { isAdmin } = require('../../middleware/adminAuth')

//adding categories for users
router.post('/add-skill-level', isAdmin, async (req, res) => {
    const skill = new Skills(req.body)

    try {
        await skill.save()
        res.status(201).send({skill})
        
        //send messages
        req.flash('success', 'You have successfully added a new Skill-Level')
    } catch (error) {
        console.log(error.message)
        req.flash('danger', 'The Skill-Level was not added')
    }
})

router.get('/view-skill-level', isAdmin, async (req, res) => {
    try {
        const skills = await Skills.find()
        res.status(200).send({skills})
        // res.render('admin/categories', categories);
        req.flash('success', 'Skill-Levels Gotten')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//categories edit
router.patch('/skill-level/edit/:id', isAdmin, async (req, res) => {

    //checking if the sent keys is equilvalent to the stored schema
    const updates = Object.keys(req.body)
    const eligibleEdit = [ 'skill' ]
    const isValid = updates.every((update) => eligibleEdit.includes(update))

    if ( !isValid ) {
        res.status(404).send('Error: Invalid Skill-Level Key')
        return req.flash('danger', 'Invalid Skill-Level Key')
    }

    //querying the db,to get the picked id
    const _id = req.params.id

    //storing the editted category
    try {
        const updatedSkillLevel = await Skills.findOne({ _id })
        if( !updatedSkillLevel ) return res.status(404).send('Skill-Level not found')

        updates.forEach((update) => updatedSkillLevel[update] = req.body[update])

        await updatedSkillLevel.save()

        res.status(200).send({updatedSkillLevel})
        req.flash('success', 'Skill-Level Updated Successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


//delete categories 
router.delete('/skill-level/delete/:id', isAdmin, async (req, res) => {
    const _id = req.params.id

    try {
        const deletedSkillLevel = await Skills.findByIdAndDelete({ _id })

        if ( !deletedSkillLevel ) {
            res.flash('danger', 'SkilL-Level not Deleted')
            res.statas(404).send({ Error: 'SkilL-Level not found'})
        }

        res.send(deletedSkillLevel)
    } catch (error) {
        res.statas(400).send(error.message)
    }
})

module.exports = router;