import express from 'express';
import { verifyJwtToken } from '../middlewares/auth.js';
import {addActivity, removeActivity,updateActivity} from '../controllers/activityController.js';

const router = express.Router();

//POST /v1/activity/:card_id/:user_id
//create activity
router.post('/:card_id/',verifyJwtToken, addActivity);

//delete /v1/activity/:card_id/:user_id
//delete activity
router.delete('/:card_id/:activity_id', verifyJwtToken,removeActivity);

router.put('/:activity_id',verifyJwtToken, updateActivity);


export default router;