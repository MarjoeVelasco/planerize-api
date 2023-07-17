import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const SECRET_KEY = 'thisisasecretkey';

export const registerUser = asyncHandler( async (req, res) => {

  try {
    const { name, email, password } = req.body;
    // Check if the username is already taken
    const existingUser =  await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'email already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    newUser.save();
    
    // Generate a JWT token and store in cookies
    const token = jwt.sign({ userId: newUser._id, name: newUser.name }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'User registered successfully', token: token});
    
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});