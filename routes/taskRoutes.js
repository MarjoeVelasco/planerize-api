import express from 'express';
import Task from '../models/task.js';
import {addTask} from '../controllers/taskController.js';

const router = express.Router();

//POST /v1/task/:card_id
//create task
router.post('/:card_id', addTask);





export default router;