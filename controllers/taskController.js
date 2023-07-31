import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Task from "../models/task.js";
import Workspace from "../models/workspace.js";
import mongoose from "mongoose";
import Card from "../models/cards.js";

export const addTask = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const { card_id } = req.params;
    const newTaskData = {title};
    const newTask = new Task(newTaskData);
    await newTask.save();

    const task_id = newTask._id;
    const updatedCard = await Card.updateOne({_id: card_id},
      { $addToSet: { task: task_id }});    

    res.status(201).json({message: 'New task has been added', data: updatedCard});

  } catch (error) {
    console.error('Failed to add task:', error);
    res.status(500).json({ message: 'Failed to add task' });
  }
});

export const checkTask = asyncHandler(async (req, res) => {
  try {
    const { task_id } = req.params;
    const task = await Task.findById(task_id); // Use findById to filter tasks based on _id

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Toggle the value of checked field
    const newCheckedValue = !task.checked;
    // Use await to make sure the update operation completes before sending the response
    await Task.updateOne({ _id: task_id }, { $set: { checked: newCheckedValue } });

    res.status(200).json({ message: 'Task updated' });
  } catch (error) {
    console.error('Failed to update task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
});


export const removeTask = asyncHandler (async (req, res) => {
  try {
    const { card_id, task_id } = req.params;
    const deletedTask = await Task.findByIdAndRemove(task_id);
    if(!deletedTask) {
      res.status(404).json({message: 'Task not found'})
    }

    const result = await Card.updateOne(
      { _id: card_id },
      { $pull: { task: task_id } }
    );

    res.status(200).json({message:'Task deleted', data: result});

  } catch (error) {
    console.error('Failed to remove task:', error);
    res.status(500).json({ message: 'Failed to remove task' });
  }
});

