import mongoose, { Model } from 'mongoose';

// Interface
export interface IUser extends mongoose.Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser, Model<IUser>>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
