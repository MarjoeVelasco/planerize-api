import express from 'express';
import {createCard} from '../controllers/cardController.js';


const router = express.Router();

//POST /v1/card/:workspace_id
//create card
router.post('/:workspace_id', createCard);




// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;