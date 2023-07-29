import express from 'express';
import {updateWorkpace, archiveWorkspace, createWorkspace, listAllWorkspace, inviteUser, getWorkspaceCards, removeUser} from '../controllers/workspaceController.js';

const router = express.Router();

//POST /v1/workspace/:user_id
//create workspace
router.post('/:user_id', createWorkspace);

//PUT
router.put('/:workspace_id',updateWorkpace);

//GET /v1/workspace/:user_id/
//list all workspaces of user
router.get('/:user_id', listAllWorkspace);

//PUT /v1/workspace/:workspace_id/
//add members to workspace
router.put('/invite/:workspace_id', inviteUser);

//PUT /v1/workspace/remove/:workspace_id/
//remove members to workspace
router.put('/remove/:workspace_id/:user_id', removeUser);

//GET /v1/workspace/all/:workspace_id/
//fetch cards based on workspace id
router.get('/all/:workspace_id', getWorkspaceCards);

//PUT /v1/workspace/archive/:workspace_id
//archive workspace
router.put('/archive/:workspace_id', archiveWorkspace);


// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;