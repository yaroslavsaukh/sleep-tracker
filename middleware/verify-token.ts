// verifyToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../db/models/User';

interface UserRequest extends Request {
  user?: typeof User;
}

const verifyToken = async (
  req: UserRequest,
  _: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization: string | undefined = req.headers.authorization;

    if (!authorization)
      throw createHttpError(401, {
        message: 'Missing token',
        code: 'mw - missing token',
      });

    const splitedToken: string[] | undefined = authorization.split(' ');
    const bearer: string | undefined = splitedToken[0];
    if (!bearer)
      throw createHttpError(401, {
        message: 'Invalid token',
        code: 'mw - invalid token',
      });

    const token: string | undefined = splitedToken[1];
    const secret: string | undefined = process.env.SECRET;

    if (!token || !secret)
      throw createHttpError(401, {
        message: 'Invalid token',
        code: 'mw - invalid token',
      });

    jwt.verify(token, secret, async (err: any, user: any) => {
      if (err) {
        console.log(err);
        throw createHttpError(401, {
          message: 'Invalid token',
          code: 'mw - invalid token',
        });
      }

      const isSuspended = await User.findOne({ email: user.email });
      if (isSuspended?.status === 'stopped') {
        throw createHttpError(401, {
          message: 'Account was suspended. Contact us for more info',
          code: 'mw - account suspended',
        });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
