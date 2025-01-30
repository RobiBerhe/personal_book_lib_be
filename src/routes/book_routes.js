const router = require('express').Router();
const books = require('../core/books');
const authMiddleware = require('../middlewares/auth');


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns a list of books
 *     tags: [books]
 *     description: Retrieve a list of books from the database
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/',authMiddleware,books.controller.getBooks);


/**
 * @swagger
 * /books/stats:
 *   get:
 *     summary: Get statistics of books for the authenticated user
 *     tags: [books]
 *     description: Returns the total number of books, books read, and books unread for the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookStatsResponse'
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.get('/stats',authMiddleware, books.controller.getBooksStats);


/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [books]
 *     description: Retrieve details of a specific book using its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Book details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Book not found
 */
router.get('/:id',authMiddleware, books.controller.getBook);


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [books]
 *     description: Add a new book to the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
router.post('/',authMiddleware, books.controller.createBook);




/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [books]
 *     description: Modify an existing book's details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBook'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Book not found
 */
router.put('/:id',authMiddleware, books.controller.updateBook);


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [books]
 *     description: Deletes a book from the database using its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteBookResponse'
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Book not found
 */
router.delete('/:id',authMiddleware, books.controller.deleteBook);


module.exports = router;