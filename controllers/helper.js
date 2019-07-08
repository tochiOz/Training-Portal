const Category = require('../models/embedded/categories')
const emSkills = require('../models/embedded/skill_level');
const Interest_Area = require('../models/embedded/interest_area');
const Education = require('../models/trainee_education')
const train_Skill = require('../models/trainee_skill')
const Internet = require('../models/internet')
const Guardian = require('../models/trainee_guardian')

const get_profile = async function (trainee) {
    const trainee_id = trainee._id
    const deptId = trainee.category_id

    //get trainee education
    const education = await Education.findOne({ trainee_id })

    //get trainee skills
    const skill = await train_Skill.findOne({ trainee_id })

    //get guardian
    const guardian = await Guardian.findOne({ trainee_id })

    //Getting the category
    const dept = await Category.findOne(deptId)

    //Getting Id's
    const skill_id = skill.level_id
    const interest_id = skill.interest_id
    // return console.log(interest_id)
    //Getting skills
    const skillSet = await emSkills.findOne(skill_id)


    //Getting Interest-area
    const interestSet = await Interest_Area.findOne(interest_id);

    return trainee, education, skill, dept, skillSet, interestSet, guardian;
}

module.exports = get_profile;