const joi = require('joi');

const createBookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    // isbn: joi.string().required(),
    isbn: joi.string().required(),
    read: joi.boolean().required(),
    rating: joi.number().default(0),
    // userId:joi.string().required(),
    // notes: joi.string(),
});


const updateBookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn: joi.string().required(),
    read: joi.boolean().required(),
    rating: joi.number().default(0),
    notes: joi.string().min(0).default(""),
});






module.exports = {
    createBookSchema,
    updateBookSchema,
}