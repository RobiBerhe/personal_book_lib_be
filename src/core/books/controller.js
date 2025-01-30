const { default: mongoose } = require("mongoose");
const service = require("./service");
const { createBookSchema, updateBookSchema } = require("./validation_schema");


async function createBook(req, res) {
    try {
        const {body} =  req;
        const validation = createBookSchema.validate(body);
        if(validation.error) {
            return res.status(400).json({message: validation.error.message});
        }
        body.userId = req.user.id;
        const {data,error} = await service.createBook({...body});
        if (error) {
            return res.status(400).json({error: {message:error}});
        }
        return res.json({book:data});
    }catch(error) {
        console.log("error [createBook] :> ",error);;
        res.status(500).json({error: {message:error.message}});
    }
  
}


function deleteBook(req, res) {
    try {
        const {id} = req.params;
        const {_, error} = service.deleteBook(id);
        if (error) {
            return res.status(400).json({error: {message:error}});
        }
        res.json({message: "book deleted"});
    }catch(error) {
        console.log("error [deleteBook] :> ",error);
        res.status(500).json({error: {message:error.message}});
    }
}


async function updateBook(req, res) {
    try {
        const {body} = req;
        const validation = updateBookSchema.validate(body);
        if(validation.error) {
            return res.status(400).json({message: validation.error.message});
        }
        const {id} = req.params;
        const user = req.user.id;
        body.user = user;
        const {data,error} = await service.updateBook(id,body);
        if (error) {
            return res.status(400).json({error: {message:error}});
        }
        res.json({book: data});
    } catch (error) {
        console.log("error [updateBook] :> ",error);
        res.status(500).json({error: {message:error.message}});
    }
}


async function getBook(req, res) {
   try {
        const {id} = req.params;
        userId = req.user.id;
        const {data,error} = await service.getBook(id,userId); 
        if (error) {
            return res.status(400).json({error: {message:error}});
        }
        return res.json({book:data});
   } catch (error) {
        console.log("error [getBook] :> ",error);
        res.status(500).json({error: {message:error.message}});
   }
}
async function getBooks(req, res) {
  try {
    const {page,limit} = req.query;
    const user = req.user.id;
    const {data,error} = await service.getBooks({user},{page,limit});
    if (error) {
        return res.status(400).json({error: {message:error}});
    }
    return res.json({books:data});
  } catch (error) {
    console.log("getbooks",error);
    res.status(500).json({error: {message:error.message}});
  }
}


async function getBooksStats(req,res){
  try {
    const user = req.user.id;
    const {data,error} = await service.getBooksStats(user);
    if (error) {
        return res.status(400).json({error: {message:error}});
    }
    return res.json({booksStats:data});
  } catch (error) {
        console.log("error [getbookstats] :> ",error);
        res.status(500).json({error: {message:error.message}});
  }
}


module.exports = {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    updateBook,
    getBooksStats
}