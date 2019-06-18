const mongoose = require('mongoose')

const traineeSkillSchema = mongoose.Schema({

    programming_skill: {
        type: Boolean,
        trim: true
    },

    teaching_experienceteaching_experience: {
        type: Boolean,
        trim: true
    },
    
    skillLevel_id: {
        type: Array,
        trim: true
    },

    trainee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userProfile'
    }
})

const TraineeSkill = mongoose.model('traineeEducation', traineeSkillSchema)

module.exports = TraineeSkill;

//remeber you will still connect skill level categories is to this model