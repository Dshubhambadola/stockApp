const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        res.status(400).send("Token not supplied!");
    }
    const decoded = jwt.verify(token, jwtSecretKey, {
        algorithm: process.env.JWT_ALGORITHM,
    });
    if (decoded) {
        req.user = decoded.email;
        next();
    } else {
        res.status(403).send("Unauthorized access! This event will be logged.");
    }
};

module.exports = {
    authMiddleware,
};
