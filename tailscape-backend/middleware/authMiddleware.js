const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: `Invalid or expired token` });
    }
};

const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only' });
    }
    next();
};

const checkVetRole = (req, res, next) => {
    if (req.user.role !== 'vet') {
        return res.status(403).json({ message: 'Access denied. Vets only' });
    }
    next();
};

module.exports = { authenticateUser, checkAdminRole, checkVetRole };