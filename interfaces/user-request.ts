import User from '../db/models/User';
import { Request } from 'express';

export interface UserRequest extends Request {
  user?: typeof User;
}
