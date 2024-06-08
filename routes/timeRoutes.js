import express from 'express';
import { getUserTimesByName, getUserTimesByEventAndUser, insertTime } from '../controllers/timeController.js'

const router = express.Router();

router.get('/userTimes/:atletaName', getUserTimesByName);
router.get('/user-times/:userId/:eventName', getUserTimesByEventAndUser);
router.post('/insertTimes/', insertTime);

export default router;