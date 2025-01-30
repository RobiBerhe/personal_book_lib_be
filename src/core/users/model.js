const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.plugin(mongoosePaginate)
const User = mongoose.model("users",userSchema)


module.exports = User