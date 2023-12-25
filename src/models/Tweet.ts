import mongoose from 'mongoose';

// Interface
export interface ITweet extends mongoose.Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

const TweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Tweet = mongoose.model<ITweet>('Tweet', TweetSchema);

export default Tweet;
