const Skills = require('../models/SkillLevel');

module.exports = {

    //add skill level
    async addSkills(req, res) {
        const skill = new Skills(req.body)

        try {
            await skill.save()
            res.redirect('/admin-skill-levels')
        } catch (error) {
            console.log(error.message)
            req.flash('danger', 'The Skill-Level was not added')
        }
    },

    async get_Skills(req, res) {
        try {
            const utility = await Skills.find()
            // const count = parseInt('0')
            // return console.log(skills)
            res.render('utility', {
                title: 'KodeHauz Training Portal',
                utility_addLlink: '/admin/add-skill-level',
                utility_link: '/admin-skill-levels',
                utility_name: 'Skills',
                utility_edit: '/admin/skill-level/edit',
                utility_amount: '10,000',
                utility
            });
            // req.flash('success', 'Skill-Levels Gotten')
        } catch (e) {
            res.status(400).send(e.message)
        }
    },

    //update skills for admin
    async update_skills(req, res) {

        //checking if the sent keys is equilvalent to the stored schema
        const updates = Object.keys(req.body)
        const eligibleEdit = ['name', 'amount']
        const isValid = updates.every((update) => eligibleEdit.includes(update))

        if (!isValid) {
            res.status(404).send('Error: Invalid Skill-Level Key')
        }

        //querying the db,to get the picked id
        const _id = req.query.id

        //storing the editted category
        try {
            const updatedSkillLevel = await Skills.findOne({ _id })
            // if (!updatedSkillLevel) return res.status(404).send('Skill-Level not found')

            updates.forEach((update) => updatedSkillLevel[update] = req.body[update])

            await updatedSkillLevel.save()

            res.status(200).send({ updatedSkillLevel })
        } catch (e) {
            return console.log(e.message)
        }
    },

    //delete skill levels
    async deleteSkills(req, res) {
        const _id = req.query.id

        try {
            const deletedSkillLevel = await Skills.findByIdAndDelete({ _id })
            res.send(deletedSkillLevel)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}