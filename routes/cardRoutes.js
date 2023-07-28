import express from 'express';
import {createCard, getCardDetails} from '../controllers/cardController.js';


const router = express.Router();

//POST /v1/card/:workspace_id
//create card
router.post('/:workspace_id', createCard);

//GET /v1/card/:card_id
//get details of a card
router.get('/:card_id', getCardDetails);


// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;