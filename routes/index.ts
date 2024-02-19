import express from 'express';
import { authRouter } from './auth';
import { userRouter } from './users';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
