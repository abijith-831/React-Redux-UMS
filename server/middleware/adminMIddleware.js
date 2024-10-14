const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Admin Middleware Error:', error);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = adminMiddleware;
