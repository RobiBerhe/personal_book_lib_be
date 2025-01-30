const Book = require("./model")
const mongoose = require("mongoose")

async function createBook({title, author, isbn, read, rating,userId}) {
    // check to see if book exists via it's isbn
    const book = await Book.findOne({isbn});
    if(book) {
        return {error: "Book already exists",data:null};
    }

    const saved = await Book.create({
        title,
        author,
        isbn,
        read,
        rating,
        user:userId
    });
    console.log(saved);
    
    return {data:saved,error:null};
}


async function deleteBook(id) {
    const findBook = await Book.findById(id);
    if(!findBook) {
        return {data:null,error:"Book not found"};
    }
    const book = await Book.findByIdAndDelete(id);
    return {data:book,error:null};
}


async function getBooks(filter,{page,limit}) {
    if(!page) {
        page = 1;
    }
    if(!limit) {
        limit = 5;
    }
    console.log("page :> ",page, " and limit :> ",limit);
    const books = await Book.paginate({...filter},{limit:limit,page:page});
    return {data:books,error:null};
}


async function getBook(bookId,userId) {
    const book = await Book.findOne({_id:bookId,user:userId});
    if(!book) {
        return {data:null,error:"Book not found"};
    }
    console.log("book :?>>>>>>>>> ",book);
    return {data:book,error:null};
}


async function updateBook(bookId,data) {
    const book = await Book.findOne({_id:bookId,user:data.user});
    if(!book) {
        return {data:null,error:"Book not found"};
    }
    const updated = await Book.findByIdAndUpdate(bookId,data);
    return {data:updated,error:null};
}


async function getBooksStats(userId){
    const books = await Book.aggregate([
        {
            $match:{user:new mongoose.Types.ObjectId(userId)}
        },
        {
            $group:{
                _id:"$user",
                totalBooks:{$sum:1},
                totalRead:{$sum:{$cond:[{$eq:["$read",true]},1,0]}},
                totalUnread:{$sum:{$cond:[{$eq:["$read",false]},1,0]}}
            }
        }
    ]);
    return {data:books,error:null};
}


module.exports = {
    createBook,
    getBooks,
    deleteBook,
    getBook,
    updateBook,
    getBooksStats
}