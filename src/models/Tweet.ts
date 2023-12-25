import mongoose from 'mongoose';

// Interface
export interface ITweet extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  text: string;
}

const TweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model<ITweet>('tweets', TweetSchema);
