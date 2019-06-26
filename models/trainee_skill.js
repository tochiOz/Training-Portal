const mongoose = require('mongoose')

const traineeSkillSchema = mongoose.Schema({

    programming_skill: {
        type: Boolean,
        trim: true
    },

    teaching_experience: {
        type: Boolean,
        trim: true
    },
    
    interest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_Profile'
    },

    level_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_Profile'
    },

    trainee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user_Profile'
    }
})

const TraineeSkill = mongoose.model('trainee_Skill', traineeSkillSchema)

module.exports = TraineeSkill;

//remeber you will still connect skill level categories is to this model