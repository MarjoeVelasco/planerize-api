import express from 'express';
import { verifyJwtToken } from '../middlewares/auth.js';
import {createCard, getCardDetails, changeStatus, updateCardDetails} from '../controllers/cardController.js';



const router = express.Router();

//POST /v1/card/:workspace_id
//create card
router.post('/:workspace_id', verifyJwtToken, createCard);

//GET /v1/card/:card_id
//get details of a card
router.get('/:card_id', verifyJwtToken, getCardDetails);

//PUT /v1/card/:card_id
//change status of card


router.put('/card-details/:card_id', verifyJwtToken, updateCardDetails);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default router;