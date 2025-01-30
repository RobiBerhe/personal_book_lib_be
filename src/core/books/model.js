const { ref } = require('joi');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        // required: true
    },
    notes: {
        type: String,
        // required: true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    }
    
});

bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('books', bookSchema);





module.exports = Book;
