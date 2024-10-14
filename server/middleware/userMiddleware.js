// const jwt = require('jsonwebtoken')

// const userMiddleware =  (req,res,next)=>{
//     const userHeader = req.headers.authorization;

//     if (!userHeader || !userHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'No token provided, authorization denied.' });
//     }

//     const token = userHeader.split(' ')[1]

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; 
//         next();
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         res.status(401).json({ message: 'Token is not valid.' });
//     }
// }


// module.exports = userMiddleware

// middleware/userMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    req.user = {
      userId: decoded.userId, 
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };
    next();
  });
};

module.exports = userMiddleware;
