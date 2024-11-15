const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function auth(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader;
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
            error: error.message,
        });
    }
}

module.exports = { auth };