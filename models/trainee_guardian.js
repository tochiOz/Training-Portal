const mongoose = require('mongoose')

const traineeGuadianSchema = mongoose.Schema({

    full_name: {
        type: String,
        trim: true
    },

    email: {
        type: String,
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
        lowercase: true
    },

    phone_number: {
        type: Number,
        trim: true,
        minLength: '10'
    },
    
    school: {
        type: String,
        trim: true
    },

    trainee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userProfile'
    }
})

const TraineeGuardian = mongoose.model('trainee_Guardian', traineeGuadianSchema)

module.exports = TraineeGuardian;