const {createUserSchema,signInSchema} = require("./validation_schema")
const service = require("./service")



async function signup(req,res){
  try {
    const {body} = req
    const validation = createUserSchema.validate(body)
    if(validation.error) {
        return res.status(400).json({message: validation.error.message});
    }
    const {data, error} = await service.createUser({...body})
    if(error) {
        return res.status(400).json({error: {message:error}});
    }
    return res.status(201).json({user:data});
  }catch(ex){
    console.log("ex [signup]: ",ex)
    res.status(500).json({error: {message:ex.message}});
  }
}


async function signin(req,res){
    try {
        const {body} = req;
        const validation = signInSchema.validate(body)
        if(validation.error){
            return res.status(400).json({message: validation.error.message});
        }
        const {data,error} = await service.signin({...body})
        if(error){
            return res.status(401).json({message:error})
        }
        return res.status(200).json({user:{...data}})
    } catch (ex) {
        console.log("ex [signin]",ex)
        res.status(500).json({error: {message:ex.message}});
    }
}


async function me(req,res){
    try {
        const {user} = req;
        return res.status(200).json({user})
    } catch (ex) {
        console.log("ex [me]",ex)
        res.status(500).json({error: {message:ex.message}});
    }
}




module.exports = {
    signup,
    signin,
    me
}