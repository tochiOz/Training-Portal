const mongoose = require('mongoose')

const traineeEducationSchema = mongoose.Schema({

    school: {
        type: String,
        trim: true
    },

    academic_discipline: {
        type: String,
        trim: true
    },
    
    academic_status: {
        type: String,
        trim: true
    },

    trainee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userProfile'
    }
})

const TraineeEducation = mongoose.model('traineeEducation', traineeEducationSchema)

module.exports = TraineeEducation;