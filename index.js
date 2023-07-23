import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';

import tagRoutes from './routes/tagRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT;

const DB_URL = `${process.env.DB_CONNECTION}//${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_HYPEN}${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.set('port', PORT);

//establish connection
try {
    await mongoose.connect(DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });
  
  
  app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
  });


} catch (error) {
  console.error(`Failed to connect: ${error} ${DB_URL}`);
}

// Add your middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/v1/auth', authRoutes);   //authentication
app.use('/v1/workspace', workspaceRoutes) //workspaces


app.use('/v1/users', userRoutes);  //users
app.use('/v1/tags', tagRoutes);    //tags 
app.use('/v1/tasks', taskRoutes);  //tasks

export default app;
