const mongoose = require('mongoose');

mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const categorySchema = mongoose.Schema({

    category: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

});

const Category = mongoose.model( 'categories', categorySchema )

module.exports = Category;