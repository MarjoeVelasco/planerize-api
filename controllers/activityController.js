import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Task from "../models/task.js";
import Workspace from "../models/workspace.js";
import mongoose from "mongoose";
import Card from "../models/cards.js";
import Activity from "../models/activity.js";

export const addActivity = asyncHandler(async (req, res) => {
  try {
    const { card_id, user_id } = req.params;
    const { content } = req.body;

    const activityData = { commenter: user_id, content: content };
    const newActivity = new Activity(activityData); // Remove the extra braces around activityData
    await newActivity.save();

    const activity_id = newActivity._id;
    const updatedCard = await Card.updateOne(
      { _id: card_id },
      { $addToSet: { activity: activity_id } }
    );

    res.status(201).json({ message: 'New activity has been added', updatedCard });
  } catch (error) {
    console.error('Failed to add activity:', error);
    res.status(500).json({ message: 'Failed to add activity' });
  }
});

export const removeActivity = asyncHandler (async (req, res) => {
  try {
    const { card_id, activity_id } = req.params;
    const deletedActivity = await Activity.findByIdAndRemove(activity_id);
    if(!deletedActivity) {
      res.status(404).json({message: 'Activity not found'})
    }

    const result = await Card.updateOne(
      { _id: card_id },
      { $pull: { activity: activity_id } }
    );

    res.status(200).json({message:'Activity deleted', data: result});

  } catch (error) {
    console.error('Failed to remove activity:', error);
    res.status(500).json({ message: 'Failed to remove activity' });
  }
});
