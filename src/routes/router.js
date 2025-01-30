const router = require('express').Router();


// let's set the base path for the routes as /api
router.use("/api", routes());



function routes() {
    router.use('/books', require('./book_routes'));
    router.use("/users",require("./auth_routes"))
    return router;
}


module.exports = router;
