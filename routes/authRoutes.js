import express from 'express';
import bcrypt from "bcrypt";
//const app = express();
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const router = express.Router();
const SECRET_KEY = 'thisisasecretkey';
//const SECRET_KEY = process.env.JWT_SECRETKEY;
//console.log(SECRET_KEY);

router.use(cookieParser());


//Register route: POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'email already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    
    // Generate a JWT token and store in cookies
    const token = jwt.sign({ userId: newUser._id, name: newUser.name }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'User registered successfully', token: token});
    
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login route POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'User registered successfully', token: token});

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

//Logout route: POST /auth/logout
router.post('logout', async (req,res) => {
  try {
    localStorage.clear();
    res.status(200).json({ message: 'Token cleared'});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});


// Protected route using the authenticateToken middleware
/*
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});
*/

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});




export default router;