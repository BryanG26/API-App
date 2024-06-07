import express from 'express';
import { getAllUsers, getUserById, getUserTimesByName, getUserTimesByEventAndUser, getUsersByUserName } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/times/:atletaName', getUserTimesByName);
router.get('/user-times/:userId/:eventName', getUserTimesByEventAndUser);
router.get('/username/:userName', getUsersByUserName);


export default router;
