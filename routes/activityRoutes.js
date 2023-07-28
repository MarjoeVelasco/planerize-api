import express from 'express';
import {addActivity} from '../controllers/activityController.js';

const router = express.Router();

//POST /v1/activity/:card_id/:user_id
//create activity
router.post('/:card_id/:user_id', addActivity);





export default router;