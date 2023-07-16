import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

//GET /tasks
router.get('/', async (req,res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve tasks', error: error.messages})
  }
});

//GET /tasks
router.get('/:userid/', async (req,res) => {
  try {
    const {userid} = req.params;
    const task = await Task.find({user_id:userid, is_active: true,});
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve tasks', error: error.messages})
  }
});

// GET /tasks/edit/:id/
router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve task', error: error.message });
  }
});

// GET /tasks/:userid/:date
router.get('/:userid/:date', async (req, res) => {
  try {
    const { userid, date } = req.params;
    const taskDate = new Date(date + 'T00:00:00.000Z');
    const task = await Task.find({ user_id: userid, date: taskDate });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
  }
});


//POST /tasks
router.post('/', async (req, res) => {
  try {
    const {task_name, description, date, user_id, tag_id } = req.body;
    const newTask = new Task({
      task_name, description, date, user_id, tag_id
    });
    await newTask.save();

    res.status(201).send({
      message: 'New task created',
      data: newTask
    });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to create task',
      error: error.message
    });
  }
});

//PUT /tasks/:id
router.put('/:id', async (req,res) => {
  try {
    const {id} = req.params;
    const {task_name, description, date, tag_id } = req.body;
    const updateTask = await Task.findByIdAndUpdate(id,{ task_name, description, date, tag_id});
    
    if(!updateTask){
      return res.status(404).json({message:'Task not found'});
    }

    res.status(201).json({
      message: 'Task updated',
      data: updateTask
    });
  
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update task',
      error: error.message
    })
  }
});


//PUT mark as complete or pending /tasks/:id
router.put('/:id/:status', async (req,res) => {
  try {
    const {id, status} = req.params;
    const updateTask = await Task.findByIdAndUpdate(id,{ status: status});
    
    if(!updateTask){
      return res.status(404).json({message:'Task not found'});
    }

    res.status(201).json({
      message: 'Task updated',
      data: updateTask
    });
  
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update task',
      error: error.message
    })
  }
});



//DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deletedTask = await Task.findByIdAndRemove(id);
    if(!deletedTask) {
      return res.status(404).json({message:'Task not found'});
    }
    res.status(200).json({
      message: 'Task deleted',
      data: deletedTask
    });

  } catch (error) {
    res.status(404).json({
      message:'Failed to delete Task',
      error: error.message
    })
  }

});



export default router;