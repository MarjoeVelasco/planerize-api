import express from 'express';
import {createWorkspace, listAllWorkspace, inviteUser} from '../controllers/workspaceController.js';

const router = express.Router();

//POST /v1/workspace/:user_id
//create workspace
router.post('/:user_id', createWorkspace);

//GET /v1/workspace/:user_id/
//list all workspaces of user
router.get('/:user_id', listAllWorkspace);

//PUT /v1/workspace/:workspace_id/
//add members to workspace
router.put('/:workspace_id', inviteUser);



// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;