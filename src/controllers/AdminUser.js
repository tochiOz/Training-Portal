const Category = require('../models/Categories');
const Skills = require('../models/SkillLevel');
const Interest_Area = require('../models/InterestArea');
const Education = require('../models/TraineeEducation');
const Trainee_Skill = require('../models/TraineeSkill');
const Guardian = require('../models/TraineeGuardian');
const Trainee = require('../models/TraineeProfile');

module.exports = {
  
    //view users page
    async view_user_profile(req, res) {
            // return console.log(trainee_profile)

        try {
            
            const trainee = trainee_profile
            
            const trainee_id = trainee._id;
            const deptId = trainee.category_id;

            //get trainee education
            const education = await Education.findOne({ trainee_id });

            //get trainee skills
            const skill = await Trainee_Skill.findOne({ trainee_id });

            //get guardian
            const guardian = await Guardian.findOne({ trainee_id });

            //Getting the category
            const dept = await Category.findOne({ deptId });

            const skill_id = skill.level_id;
            const interest_id = skill.interest_id;

            //Getting skills
            const skillSet = await Skills.findOne({skill_id});

            //Getting Interest-area
            const interestSet = await Interest_Area.findOne({interest_id});

            // return console.log(interestSet)

            res.status(200).render('dashboard_profile_form', {
                title: 'Training Profile',
                guardian,
                skill,
                education,
                dept,
                skillSet,
                interestSet,
                trainee
            });
        } catch (e) {
            console.log(e)
        }
    },

    async delete_user(req, res) {
        _id = req.query.id;

        try {
            const traineeProfile = await Trainee.findOne({ _id });

            //delete account
            await traineeProfile.remove();

            res.send(traineeProfile)
        } catch (e) {
            console.log(e)
        }
    }
}