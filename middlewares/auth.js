import jwt from 'jsonwebtoken';

const SECRET_KEY = 'thisisasecretkey'; // Replace with your actual secret key

// Middleware function to verify JWT token
export const verifyJwtToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract just the token value (remove "Bearer ")
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};


