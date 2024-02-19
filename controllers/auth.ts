import User from '../db/models/User';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import generateAccessToken from '../middleware/token';
import { generateRandomCode } from '../utils/generate-code';
import { sendCode } from '../utils/send-code';
import { addNumber } from '../utils/add-number';
import { sendMail } from '../utils/send-mail';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // #swagger.tags = ['Auth']
    const { name, email, gender, password, birthday, phone } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      throw createError({ code: 400, message: 'Username already exists' });
    const hashedPass = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      gender,
      password: hashedPass,
      birthday,
      phone,
    });
    const accessToken = generateAccessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    res.status(200).json({ token: accessToken });
  } catch (e: any) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // #swagger.tags = ['Auth']
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      throw createError(400, {
        message: 'Please provide both email and password',
        code: 'login - missing email or password',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, {
        message: 'Cannot find user with provided email',
        code: 'login - missing user with provided email',
      });
    }

    const result = bcrypt.compareSync(password, user.password);

    if (!result) {
      throw createError(401, {
        message: 'Invalid email password pair',
        code: 'login - invalid credentials pair',
      });
    }

    const accessToken = generateAccessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    res.status(200).json({ token: accessToken });
  } catch (e: any) {
    next(e);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // #swagger.tags = ['Auth']
    const { phone, email } = req.body;
    if (phone) {
      const user = await User.findOne({ phone });
      if (!user) {
        throw createError(404, {
          message: 'Cannot find user with provided email',
          code: 'login - missing user with provided email',
        });
      }
      const resetCode = generateRandomCode();
      // await addNumber();
      await user.updateOne({ code: resetCode });
      // await sendCode(resetCode, phone);
      console.log(resetCode);
      // res.status(200).json({ message: 'Sms sended successfully' });
      res.status(200).json({ code: resetCode });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        throw createError(404, {
          message: 'Cannot find user with provided email',
          code: 'login - missing user with provided email',
        });
      }
      const resetCode = generateRandomCode();
      await sendMail({
        subject: 'Password reset',
        to: [email],
        text: `Your reset code ${resetCode}`,
      });
      res.status(200).json({ code: resetCode });
    }
  } catch (e: any) {
    next(e);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // #swagger.tags = ['Auth']
    const { email, phone, resetCode, newPassword } = req.body;
    const user = await User.findOne({ phone });

    if (user?.code !== resetCode) {
      throw createError(404, {
        message: 'Invalid code',
        code: 'login - missing user with provided email',
      });
    }

    const newHashedPassword = bcrypt.hashSync(newPassword, 10);
    await user?.updateOne({ password: newHashedPassword, code: null });

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (e: any) {
    next(e);
  }
};
