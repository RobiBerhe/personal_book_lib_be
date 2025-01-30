const router = require('express').Router();
const books = require('../core/books');
const authMiddleware = require('../middlewares/auth');

// router.get('/', (req, res) => {
//     res.json([{id:1,title:"the book of life", author:"john doe",isbn:"111111",read:true,rating:5}, {id:2,title:"the book of death", author:"john doe",isbn:"2222",read:false,rating:5},{id:3,title:"man's search for meaning", author:"john doe",isbn:"333333",read:true,rating:5}]);
// });

router.get('/',authMiddleware,books.controller.getBooks);
router.get('/:id',authMiddleware, books.controller.getBook);
router.post('/',authMiddleware, books.controller.createBook);
router.put('/:id',authMiddleware, books.controller.updateBook);
router.get('/stats/:id',authMiddleware, books.controller.getBooksStats);
router.delete('/:id',authMiddleware, books.controller.deleteBook);


module.exports = router;