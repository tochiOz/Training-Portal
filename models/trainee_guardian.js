const mongoose = require('mongoose')

const traineeEducationSchema = mongoose.Schema({

    full_name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid, Please check the Email and try again')
            }
        }
    },

    address: {
        type: String,
        minLength: '10',
        maxLength: '60',
        trim: true,
        lowercase: true,
        required: true
    },

    phone_number: {
        type: Number,
        trim: true,
        minLength: '10'
    },school: {
        type: String,
        trim: true
    },

    trainee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userProfile'
    }
})

const TraineeEducation = mongoose.model('traineeGuardian', traineeEducationSchema)

module.exports = TraineeEducation;