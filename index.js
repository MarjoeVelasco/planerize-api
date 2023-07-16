import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT;
const DB_URL = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

app.set('port', PORT);

//establish connection
try {
  await mongoose.connect(DB_URL);
  app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
  });
} catch (error) {
  console.error('Failed to connect');
}

// Add your middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(cookieParser());


//routes
app.use('/auth', authRoutes);   //authentication
app.use('/users', userRoutes);  //users
app.use('/tags', tagRoutes);    //tags 
app.use('/tasks', taskRoutes);  //tasks



app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

