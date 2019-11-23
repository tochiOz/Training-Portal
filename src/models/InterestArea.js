const mongoose = require('mongoose');

const interestAreaSchema = mongoose.Schema({

    number: {
        type: Number
    },

    name: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

});

const Interest_Area = mongoose.model( 'interest_area', interestAreaSchema )

module.exports = Interest_Area;