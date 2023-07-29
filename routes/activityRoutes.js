import express from 'express';
import {addActivity, removeActivity,updateActivity} from '../controllers/activityController.js';

const router = express.Router();

//POST /v1/activity/:card_id/:user_id
//create activity
router.post('/:card_id/:user_id', addActivity);

//delete /v1/activity/:card_id/:user_id
//delete activity
router.delete('/:card_id/:activity_id', removeActivity);

router.put('/:activity_id',updateActivity);


export default router;