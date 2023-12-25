import mongoose from 'mongoose';

// Interface
export interface IUserFollower extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  followingId: mongoose.Types.ObjectId;
}

const UserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    followingId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true }
);

export const UserFollower = mongoose.model<IUserFollower>('users_followers', UserSchema);
