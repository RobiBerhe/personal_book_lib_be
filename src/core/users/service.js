const User = require("./model")
const argon2 = require("argon2")
const jsonwebtoken = require("jsonwebtoken")

async function createUser({fullName, username, email, password}){
   try {
    const usernameTaken = await User.exists({username})
    if(usernameTaken){
        return {error:"username already taken",data:null}
    } 
    const emailExists =  await User.exists({email})
    if(emailExists){
        return {error:"email already exists",data:null}
    } 
    userPassword = await argon2.hash(password)

    const user = await User.create({fullName,email,password:userPassword,username})
    const data = {fullName:user.fullName,email:user.email,username:user.username}
    const token = jsonwebtoken.sign(data,process.env.JWT_SECRET)

    return {
        data:{...data,token},
        error:null
    }
   } catch (error) {
    console.log("ex : [createuser] ",error);
    throw error;
   }
}

async function signin({username,password}){
    try {
        const userExists = await User.exists({username})
        if(!userExists){
            return {error:"check if you've entered the correct username password combination",data:null}
        }
        const u = await User.findOne({username})
        const verirfyPassword = await argon2.verify(u.password,password);
        const data = {fullName:u.fullName,email:u.email,username:u.username,id:u._id}
        const token = jsonwebtoken.sign(data,process.env.JWT_SECRET)
        if(verirfyPassword){
            return {
                data:{...data,token},
                error:null
            }
        }
        return {
            data:null,
            error:"check if you've entered the correct username password combination"
        }
    } catch (error) {
        throw error
    }
}



module.exports  = {
    createUser,
    signin  
}