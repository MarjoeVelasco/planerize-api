import express from 'express';
import { verifyJwtToken } from '../middlewares/auth.js';
import {updateWorkpace, archiveWorkspace, createWorkspace, listAllWorkspace, inviteUser, getWorkspaceCards, removeUser} from '../controllers/workspaceController.js';

const router = express.Router();

//POST /v1/workspace/
//create workspace
router.post('/', verifyJwtToken, createWorkspace);

//PUT
router.put('/:workspace_id',verifyJwtToken, updateWorkpace);

//GET /v1/workspace/:user_id/
//list all workspaces of user
router.get('/:user_id', verifyJwtToken, listAllWorkspace);

//PUT /v1/workspace/:workspace_id/
//add members to workspace
router.put('/invite/:workspace_id', verifyJwtToken, inviteUser);

//PUT /v1/workspace/remove/:workspace_id/
//remove members to workspace
router.put('/remove/:workspace_id/:user_id', verifyJwtToken, removeUser);

//GET /v1/workspace/all/:workspace_id/
//fetch cards based on workspace id
router.get('/all/:workspace_id', verifyJwtToken, getWorkspaceCards);

//PUT /v1/workspace/archive/:workspace_id
//archive workspace
router.put('/archive/:workspace_id', verifyJwtToken, archiveWorkspace);


// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;