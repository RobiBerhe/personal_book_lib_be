const joi = require("joi")


const createUserSchema = joi.object({
    fullName:joi.string().pattern(/^[A-Za-z]+ [A-Za-z]+$/).required(),
    username:joi.string().required().min(3),
    email:joi.string().email().required(),
    password:joi.string().required().min(4),
})


const signInSchema = joi.object({
    username:joi.string().required(),
    password:joi.string().required(),
})

module.exports = {createUserSchema,signInSchema}