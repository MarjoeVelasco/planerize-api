// workspaceController.js

import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Workspace from "../models/workspace.js";

export const createWorkspace = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    //const { members } = req.body;
    const { user_id } = req.params; // Use lowercase "user_id"

    const newWorkspaceData = {
      title: title,
      user_id: user_id, // Use lowercase "user_id"
      //members: [members]
    };

    const newWorkspace = new Workspace(newWorkspaceData);
    await newWorkspace.save();

    res.status(201).send({
      message: 'New Workspace Created',
      data: newWorkspace
    });
    
  } catch (error) {
    console.error('Failed to create workspace:', error);
    res.status(500).json({ message: 'Failed to create workspace' });
  }
});
