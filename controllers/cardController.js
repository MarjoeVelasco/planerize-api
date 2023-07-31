import asyncHandler from "express-async-handler";
import Workspace from "../models/workspace.js";
import mongoose from "mongoose";
import Card from "../models/cards.js";

export const createCard = asyncHandler(async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const { title, description } = req.body;
    //create new card
    const newCardData = { title: title, description: description, status: "to do", tasks: [], activity: []};
    const newCard = new Card(newCardData);
    await newCard.save();
    //add card to workspace    
    await Workspace.updateOne({_id: workspace_id}, { $addToSet: { cards: newCard._id }});
    res.status(201).json({message: 'New card has been added', data: newCardData});

  } catch (error) {
    console.error('Failed to create card:', error);
    res.status(500).json({ message: 'Failed to create card' });
  }
});

export const getCardDetails = asyncHandler(async (req, res) => {
  try {
    const { card_id } = req.params;

    const card = await Card.findOne({ _id: card_id });
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    const cardDetails = await Card.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(card_id) },
      },
      {
        $lookup: {
          from: "activities",
          localField: "activity",
          foreignField: "_id",
          as: "activity_data",
        },
      },
      {
        $unwind: "$activity_data",
      },
      {
        $lookup: {
          from: "users",
          let: { commenterId: "$activity_data.commenter" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$commenterId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
              },
            },
          ],
          as: "activity_data.commenter_data",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          status: { $first: "$status" },
          delete: { $first: "$delete" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" },
          activity: { $first: "$activity" },
          activity_data: { $push: "$activity_data" },
          task: { $first: "$task" },
        },
      },
      {
        $unwind: {
          path: "$task",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "task",
          foreignField: "_id",
          as: "task_data",
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          status: { $first: "$status" },
          delete: { $first: "$delete" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          __v: { $first: "$__v" },
          activity: { $first: "$activity" },
          activity_data: { $first: "$activity_data" },
          task_data: { $push: "$task_data" },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          delete: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          activity: 1,
          activity_data: {
            _id: 1,
            commenter: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1,
            commenter_data: {
              $arrayElemAt: ["$activity_data.commenter_data", 0],
            },
          },
          task_data: 1,
        },
      },
    ]);
    res.status(200).json({ message: 'Fetch cards successful', data: cardDetails });
  } catch (error) {
    console.error('Failed to fetch details:', error);
    res.status(500).json({ message: 'Failed to fetch details' });
  }
});


export const changeStatus = asyncHandler(async (req, res) => {
  try {
    const { card_id } = req.params;
    const { status } = req.body;
    const result = await Card.findByIdAndUpdate(card_id,{ status});   
    res.status(200).json({message: 'Card updated', data: result});
  } catch (error) {
    console.error('Failed to update:', error);
    res.status(500).json({ message: 'Failed to update' });
  }
});

export const updateCardDetails = asyncHandler (async (req, res) => {
  try {
    const { card_id } = req.params;
    const { title, description } = req.body;
    const result = await Card.findByIdAndUpdate(card_id,{ title, description}); 
    res.status(200).json({message: 'Card updated', data: result});
  } catch (error) {
    console.error('Failed to update:', error);
    res.status(500).json({ message: 'Failed to update' });
  }
});