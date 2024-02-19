import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  birthday: Date;
  status: string;
  code: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  birthday: { type: Date, required: true },
  status: { type: String, default: 'active' },
  phone: { type: String, required: true },
  code: { type: String },
});

export default mongoose.model('User', userSchema);
