import express from 'express';
import {createWorkspace} from '../controllers/workspaceController.js';

const router = express.Router();

//POST /v1/workspace/
router.post('/:user_id', createWorkspace);


// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;