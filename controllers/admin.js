const Category = require('../models/embedded/categories')
const Skills = require('../models/embedded/skill_level');
const Interest_Area = require('../models/embedded/interest_area');
const Swal = require('sweetalert2')
const Admin = require('../models/admin')

module.exports = {
    async createAdmin(req, res) {
        const admin = new Admin(req.body)

        const adminEmailCheck = await Admin.findEmail(req.body.email)

        if (adminEmailCheck) {
            return res.status(400).send({ message: `${adminEmailCheck.email} already exist` })
        }

        try {
            await admin.save()
            const token = await admin.generateAuthToken()
            res.status(201).send({ admin, token })
            req.flash('sucess', `You Have Sucessfully Created an Admin Account`)

            // return res.redirect('/login')
        } catch (err) {
            res.status(400).send(err.message)
        }
    },

    async adminLogin(req, res) {

        try {
            const admin = await Admin.findByCredentials(req.body.email, req.body.password)
            const token = await admin.generateAuthToken()

            res.cookie('admin_jwt', token, { maxAge: 400000000 })
            req.flash('sucess', `You Have Sucessfully Logged In Admin ${admin.email}`)

            return res.redirect('/admin-dashboard')
        } catch (e) {
            if (e) {
                req.flash('danger', 'You are not Authorised')
                return res.redirect('/login')
            }
        }
    },

    async adminLogout(req, res) {
        try {
            adminProfile.tokens = []
            await adminProfile.save()
            res.clearCookie('jwt')
            req.flash('success', 'Thank You for using our Portal')
            return res.redirect('/')
        } catch (e) {
            res.status(400).send(e.message)
        }
    },

    //add-categories
    async add_categories(req, res) {
        const category = new Category(req.body)

        try {
            await category.save()

            //alert
            Swal.fire(
                'Department Created Succefully!',
                'success'
            )

            res.redirect('/admin-departments')
        } catch (error) {
            console.log(error.message)
            req.flash('danger', 'The category was not added')
        }
    },

    //get-categories
    async get_categories(req, res) {
    
        try {
            var count = 0;
            const categories = await Category.find();
            res.render('categories', {
                title: 'KodeHauz Training Portal',
                count: count++,
                categories
            });
        } catch (e) {
            res.status(400).send(e.message)
        }
    },

    //updating categories
    async update_categories(req, res) {
        // return console.log(req.body)
        //checking if the sent keys is equilvalent to the stored schema
        const updates = Object.keys(req.body)
        const eligibleEdit = ['category']
        const isValid = updates.every((update) => eligibleEdit.includes(update))
        // return console.log(isValid)
        if (!isValid) {
            res.status(404).send('Error: Invalid Category Key')
            return req.flash('danger', 'Invalid Category Key')
        }

        //querying the db,to get the picked id
        const _id = req.params.id

        //storing the editted category
        try {
            const updatedCategory = await Category.findOne({ _id })
            if (!updatedCategory) return res.status(404).send('Category not found')

            updates.forEach((update) => updatedCategory[update] = req.body[update])

            await updatedCategory.save()

            res.status(200).send({ updatedCategory })
            req.flash('success', 'Category Updated Successfully')
        } catch (error) {
            return console.log(e.message)
            res.status(400).send(error.message)
        }
    },

    //delete categories
    async delete_categories(req, res, next) {
        const _id = req.params.id

        try {
            const deletedCategory = await Category.findByIdAndDelete({ _id })

            if (!deletedCategory) {
                res.status(404).send({ Error: 'Category not found' })
            }

           next()
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    //add skill level
    async addSkills(req, res) {
        const skill = new Skills(req.body)

        try {
            await skill.save()

            Swal.fire(
                'Good job!',
                'Item Added Successfully',
                'success'
            )
           
            res.redirect('/admin-skill-levels')
        } catch (error) {
            console.log(error.message)
            req.flash('danger', 'The Skill-Level was not added')
        }
    },

    async get_Skills(req, res) {
        try {
            const skills = await Skills.find()
            // res.status(200).send({ skills })
            res.render('skill_levels', {
                skills,
                title: 'KodeHauz Training Portal',
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
        const eligibleEdit = ['skill']
        const isValid = updates.every((update) => eligibleEdit.includes(update))

        if (!isValid) {
            res.status(404).send('Error: Invalid Skill-Level Key')
            return req.flash('danger', 'Invalid Skill-Level Key')
        }

        //querying the db,to get the picked id
        const _id = req.params.id

        //storing the editted category
        try {
            const updatedSkillLevel = await Skills.findOne({ _id })
            if (!updatedSkillLevel) return res.status(404).send('Skill-Level not found')

            updates.forEach((update) => updatedSkillLevel[update] = req.body[update])

            await updatedSkillLevel.save()

            res.status(200).send({ updatedSkillLevel })
            req.flash('success', 'Skill-Level Updated Successfully')
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    //delete skill levels
    async deleteSkills(req, res) {
        const _id = req.params.id

        try {
            const deletedSkillLevel = await Skills.findByIdAndDelete({ _id })

            if (!deletedSkillLevel) {
                res.flash('danger', 'SkilL-Level not Deleted')
                res.status(404).send({ Error: 'SkilL-Level not found' })
            }

            res.send(deletedSkillLevel)
        } catch (error) {
            res.statas(400).send(error.message)
        }
    },

    //adding interest areas for users
    async add_interest_area(req, res) {
        const interest = new Interest_Area(req.body)

        try {
            await interest.save()
            Swal.fire(
                'Good job!',
                'Item Added Successfully',
                'success'
            )

            res.redirect('/admin-interest-areas')
        } catch (error) {
            console.log(error.message)
            req.flash('danger', 'The Interest-Area was not added')
        }
    },

    //get interest
    async get_interest_area(req, res) {
        try {
            const interests = await Interest_Area.find()
            // res.status(200).send({ interests })
            res.render('interest-area', {
                interests,
                title: 'KodeHauz Training Portal',
            });
            // req.flash('success', 'Interest-Areas Gotten')
        } catch (e) {
            res.status(400).send(e.message)
        }
    },

    //edit interest_area
    async update_interest_area(req, res) {

        //checking if the sent keys is equilvalent to the stored schema
        const updates = Object.keys(req.body)
        const eligibleEdit = ['interest', 'description']
        const isValid = updates.every((update) => eligibleEdit.includes(update))

        if (!isValid) {
            res.status(404).send('Error: Invalid Interest-Area Key')
            return req.flash('danger', 'Invalid Interest-Area Key')
        }

        //querying the db,to get the picked id
        const _id = req.params.id

        //storing the editted category
        try {
            const updatedinterest = await Interest_Area.findOne({ _id })
            if (!updatedinterest) return res.status(404).send('Interest-Area not found')

            updates.forEach((update) => updatedinterest[update] = req.body[update])

            await updatedinterest.save()

            res.status(200).send({ updatedinterest })
            req.flash('success', 'Interest-Area Updated Successfully')
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    //delete interest
    async delete_interest_area(req, res) {
        const _id = req.params.id

        try {
            const deletedInterest = await Interest_Area.findByIdAndDelete({ _id })

            if (!deletedInterest) {
                res.flash('danger', 'Interest-Area not Deleted')
                res.status(404).send({ Error: 'Interest-Area not found' })
            }

            res.send(deletedInterest)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}