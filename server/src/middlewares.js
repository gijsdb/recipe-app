const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) {
        res.status(401).json({message:"You do not have a JWT"});
    } 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        res.status(400).json({message:"Bad request", error: error});
        console.log(error);
    }
}

// If route is anything else, create an error
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error middleware, must have 4 params
// Only show code stack in development
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'pancakes' : error.stack,
    });
};

module.exports = {
    auth,
    notFound,
    errorHandler,
};