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



export const getCardDetails = asyncHandler (async (req, res) => {
  try {
    const {card_id} = req.params;
    const cardDetails = await Card.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(card_id) }
      },
      {
        $lookup: {
          from: "activities",
          localField: "activity",
          foreignField: "_id",
          as: "activity_data"
        }
      },
      {
        $lookup: {
          from: "tasks",
          localField: "task",
          foreignField: "_id",
          as: "task_data"
        }
      },
    ]);
    res.status(201).json({ message: 'Fetch cards successful', data: cardDetails });
  } catch (error) {
    console.error('Failed to fetch details:', error);
    res.status(500).json({ message: 'Failed to fetch details' });
  }

});