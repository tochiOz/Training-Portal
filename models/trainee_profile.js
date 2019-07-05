const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Education = require('./trainee_education');
const Trainee_Skill = require('./trainee_skill');
const Guardian = require('./trainee_guardian');
const Internet = require('./internet');

const userProfileSchema = mongoose.Schema({
    
    full_name: {
        type: String,
        trim: true
    },

    gender: {
        type: String,
        trim: true
    },

    email: {
        type: String,
        // required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid, Please check the Email and try again')
            }
        }
    },

    dob: {
        type: String,
        trim: true
    },

    address: {
        type: String,
        minLength: '10',
        maxLength: '60',
        trim: true,
        lowercase: true,
    },

    phone_number: {
        type: Number,
        trim: true,
        minLength: '10'
    },

    password: {
        type: String,
        trim: true,
        minLength: '3',
        // required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Please your password cannot contain "password"')
            }
        }
    },
    
    avatar: {
        type: String
    },

    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_Profile'
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});


//using virtual to create a relationship between user and owned directories
userProfileSchema.virtual('categories', {
    ref: 'categories',
    localField: '_id',
    foreignField: 'category_id'
});

userProfileSchema.virtual('trainee_Internet', {
    ref: 'trainee_Internet',
    localField: '_id',
    foreignField: 'trainee_id'
});

userProfileSchema.virtual('trainee_Skill', {
    ref: 'trainee_Skill',
    localField: '_id',
    foreignField: 'trainee_id'
});

userProfileSchema.virtual('trainee_Guardian', {
    ref: 'trainee_Guardian',
    localField: '_id',
    foreignField: 'trainee_id'
});


//method to generate token
userProfileSchema.methods.generateAuthToken = async function () {

    //accessing the global current user registering at that point in time
    const userProfile = this;

    const token = jwt.sign({ _id: userProfile._id.toString() }, process.env.SECRET, { expiresIn: '1 week'});

    //saving the token in the model
    userProfile.tokens = userProfile.tokens.concat({ token });

    await userProfile.save();
    return token;
};

userProfileSchema.statics.findByCredentials = async ( email, password ) => {

    const userProfile = await Trainee.findOne({ email });

    if( !userProfile ) {
        throw new Error('Email does not exist')
    }

    const isValid = await bcrypt.compare( password, userProfile.password );

    if( !isValid ) {
        throw new Error('Password does not exist, Please check and Try again')
    } 
    return userProfile;
};

//methods to hash passwords before save the data to the db
userProfileSchema.pre('save', async function (next) {
    
    const userProfile = this;

    if(userProfile.isModified('password')) {
        userProfile.password = await bcrypt.hash( userProfile.password, 8 )
    }

    next()
});

userProfileSchema.pre('remove', async function (next) {
   const user = this;

   //deleting attributes
    await Education.remove({ trainee_id: user._id });
    await Trainee_Skill.remove({ trainee_id: user._id });
    await Guardian.remove({ trainee_id: user._id });
    await Internet.remove({ trainee_id: user._id });

});

const Trainee = mongoose.model('trainee_Profile', userProfileSchema);

module.exports = Trainee;