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

categorySchema.virtual('trainee_Education', {
    ref: 'trainee_Profile',
    localField: '_id',
    foreignField: 'category_id'
})

const Category = mongoose.model( 'categories', categorySchema )

module.exports = Category;