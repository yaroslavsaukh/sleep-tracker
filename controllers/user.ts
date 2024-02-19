import User from '../db/models/User';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { UserRequest } from '../interfaces/user-request';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Users']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  try {
    const list = await User.find();
    res.status(200).json({ list });
  } catch (e: any) {
    next(e);
  }
};

export const self = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // #swagger.tags = ['Users']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  try {
    const { _id } = req?.user as any;
    const user = await User.findOne({ _id }).select('-password -_id');
    if (!user) {
      throw createError(500, 'No user');
    }
    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

export const updateSelf = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // #swagger.tags = ['Users']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  try {
    const { _id } = req?.user as any;
    const { name, email, gender, password, birthday, phone } = req.body;
    const upd = { name, email, gender, password, birthday, phone };
    const user = await User.findOneAndUpdate({ _id }, upd, {
      new: true,
    }).select('-password -_id');
  } catch (e) {
    next(e);
  }
};
