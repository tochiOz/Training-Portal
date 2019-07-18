const mongoose = require('mongoose');

const skillLevelSchema = mongoose.Schema({

    number: {
        type: Number
    },

    name: {
        type: String,
        trim: true
    },

    amount: {
        type: Number,
        trim: true
    }

});

const Skill_Level = mongoose.model( 'skill_level', skillLevelSchema )

module.exports = Skill_Level;