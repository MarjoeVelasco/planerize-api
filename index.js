import express from 'express';
import process from 'node:process';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

import activityRoutes from './routes/activityRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

import http from 'http';
import { Server } from 'socket.io';

dotenv.config({ path: '../.env' });

const app = express();
const server = http.createServer(app);
const io = new Server(server);
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

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A client connected');

  // Event to listen for client disconnect
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Add your middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/v1/auth', authRoutes);   //authentication
app.use('/v1/workspace', workspaceRoutes) //workspaces
app.use('/v1/card', cardRoutes);  //card
app.use('/v1/task', taskRoutes);  //tasks
app.use('/v1/activity', activityRoutes);  //activity
app.use('/v1/users', userRoutes);  //users


export { app, io };

