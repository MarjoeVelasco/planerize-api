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

