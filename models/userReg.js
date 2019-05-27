const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const traineeRegSchema = mongoose.Schema({
    
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

    password: {
        type: String,
        trim: true,
        minLength: '3',
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Please your password cannot contain "password"')
            }
        }
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//method to generate token
traineeRegSchema.methods.generateAuthToken = async function () {

    //accessing the global current user registering at that point in time
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, { expires: 3 })

    //saving the token in the model
    user.tokens = user.tokens.concat({ token })

    return token;
}

const userReg = mongoose.model('users', traineeRegSchema)

module.exports = userReg;