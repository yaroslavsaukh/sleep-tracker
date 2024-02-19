import express from 'express';
import verifyToken from '../middleware/verify-token';
import { list, self, updateSelf } from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/list', verifyToken, list);
userRouter.get('/self', verifyToken, self);
userRouter.patch('/update', verifyToken, updateSelf);
