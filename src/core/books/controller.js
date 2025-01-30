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
        console.log("book :> ",data);
        return res.json({book:data});
    }catch(error) {
        console.log("error [createBook] :> ",error);;
        res.status(500).json({error: {message:error.message}});
    }
  
}


function deleteBook(req, res) {
    try {
        const {id} = req.params;
        console.log("deleting book :> ",id);
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
}


async function getBook(req, res) {
    console.log("getting book :> ",req.params);
    const {id} = req.params;
    userId = req.user.id;
    const {data,error} = await service.getBook(id,userId); 
    if (error) {
        return res.status(400).json({error: {message:error}});
    }
    console.log("book :> ",data);
    return res.json({book:data});
}
async function getBooks(req, res) {
    const {page,limit} = req.query;
    const user = req.user.id;
    const {data,error} = await service.getBooks({user},{page,limit});
    if (error) {
        return res.status(400).json({error: {message:error}});
    }
    console.log("books :> ",data);
    return res.json({books:data});
}


async function getBooksStats(req,res){
    const user = req.user.id;
    const {data,error} = await service.getBooksStats(user);
    if (error) {
        return res.status(400).json({error: {message:error}});
    }
    console.log("books stats :> ",data);
    return res.json({booksStats:data});
}


module.exports = {
    createBook,
    deleteBook,
    getBook,
    getBooks,
    updateBook,
    getBooksStats
}