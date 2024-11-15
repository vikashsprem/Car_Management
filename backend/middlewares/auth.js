const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function auth(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) {
        res.status(403).json({
            message: "Please check you credentials"
        })
    } else {
        req.userId = decoded.id;
        next();
    }
}

module.exports = { auth: auth }