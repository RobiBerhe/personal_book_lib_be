const router = require('express').Router();
const users = require("../core/users")
const authMiddleware = require('../middlewares/auth');



/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]  # <-- Tag the endpoint as "Users"
 *     description: Register a new user in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *               fullName:
 *                 type: string
 *                 description: The user's name
 *               username:
 *                 type: string
 *                 description: The user's username
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully created"
 *       400:
 *         description: Bad request, invalid input
 *       409:
 *         description: Conflict, user already exists
 */
router.post('/signup', users.controller.signup);



/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]  # <-- Tag the endpoint as "Users"
 *     description: Authenticate a user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User successfully logged in, returns authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, invalid username or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', users.controller.signin);



/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user details
 *     tags: [Users]  # <-- Tag the endpoint as "Users"
 *     description: Retrieve the details of the currently authenticated user
 *     responses:
 *       200:
 *         description: User details successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       description: The user's full name
 *                     email:
 *                       type: string
 *                       description: The user's email address
 *                     username:
 *                       type: string
 *                       description: The user's username
 *       401:
 *         description: Unauthorized, user is not authenticated
 *       500:
 *         description: Internal server error
 */
router.get('/me', authMiddleware, users.controller.me);


module.exports = router;
