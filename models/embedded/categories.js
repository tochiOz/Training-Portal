const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    category: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

});

const Category = mongoose.model( 'categories', categorySchema )

module.exports = Category;