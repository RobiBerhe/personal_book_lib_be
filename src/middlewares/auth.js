const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({error:{message: "unauthorized"}});
    }
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
        req.user = decoded;
        next();
    }
    else {
        return res.status(401).json({error:{message: "unauthorized"}});
    }
}


module.exports = auth;