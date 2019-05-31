const mongoose = require('mongoose');

const skillLevelSchema = mongoose.Schema({

    skill: {
        type: String,
        trim: true
    }

});

const Skill_Level = mongoose.model( 'skill_level', skillLevelSchema )

module.exports = Skill_Level;