const Category = require('../models/embedded/categories')
const Skills = require('../models/embedded/skill_level');
const Interest_Area = require('../models/embedded/interest_area');
const Swal = require('sweetalert2')

module.exports = {
    //getting runs from admin routes
    async get_formDetails(req, res) {
        try {
            //get categories
            const categories = await Category.find()

            //get interest areas
            const interests = await Interest_Area.find()

            //get skills
            const skills = await Skills.find()


            res.status(200).render('profile_form', {
                departments: categories,
                title: 'Training Registration zone',
                interests,
                skills
            })
        } catch (e) {
            res.status(400).send(e.message)
        }

    },

   

    async profile(req, res, next) {
        res.render('trainee_profile', {
            title: 'Trainee HomePage',
            profile_name: trainee_profile.full_name,
            avatar: trainee_profile.avatar,
            email: trainee_profile.email
        });
    }
}