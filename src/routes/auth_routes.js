const router = require('express').Router();
const users = require("../core/users")
const authMiddleware = require('../middlewares/auth');

router.post('/signup', users.controller.signup);

router.post('/login', users.controller.signin);


router.get('/me', authMiddleware, users.controller.me);


module.exports = router;
