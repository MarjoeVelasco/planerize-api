import express from 'express';
import Task from '../models/task.js';
import { verifyJwtToken } from '../middlewares/auth.js';
import {addTask, removeTask} from '../controllers/taskController.js';

const router = express.Router();

//POST /v1/task/:card_id
//create task
router.post('/:card_id', verifyJwtToken, addTask);

//delete /v1/task/:card_id/:user_id
//delete task
router.delete('/:card_id/:task_id', verifyJwtToken, removeTask);


export default router;