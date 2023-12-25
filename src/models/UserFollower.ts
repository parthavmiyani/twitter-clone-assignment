import mongoose from 'mongoose';

// Interface
export interface IUserFollower extends mongoose.Document {
  uId: mongoose.Types.ObjectId;
  followingId: mongoose.Types.ObjectId;
}

const UserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    followingId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const UserFollower = mongoose.model<IUserFollower>('UserFollower', UserSchema);

export default UserFollower;
