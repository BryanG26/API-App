import express from 'express';
import { getAllUsers, getUserById, getUsersByUserName, insertUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/username/:userName', getUsersByUserName);
router.post('/insertUsers/', insertUser);



export default router;