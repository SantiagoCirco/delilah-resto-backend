const jwt = require('jsonwebtoken');

function getUserIdFromToken(req) {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Authorization required' })
    const RequestToken = req.headers.authorization.substring(7);
    const userId = jwt.verify(RequestToken, process.env.SECRET_TOKEN).id;
    return userId;
}

module.exports = getUserIdFromToken;