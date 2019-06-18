const mongoose = require('mongoose')

const traineeInternetSchema = mongoose.Schema({

    account_name: {
        type: String,
        trim: true
    },

    account_password: {
        type: String,
        trim: true
    },

    trainee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userProfile'
    }
})

const TraineeInternet = mongoose.model('traineeInternet', traineeInternetSchema)

module.exports = TraineeInternet;