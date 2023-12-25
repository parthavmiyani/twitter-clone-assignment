import { Request, Response } from 'express';
import { ObjectId, Tweet, UserFollower } from './../../models';

class TweetController {
  async createTweet(req: Request, res: Response) {
    const { text } = req.body;

    const tweet = await Tweet.create({
      text: text,
      userId: req.user._id,
    });

    return res.send({
      message: 'Tweet Created!',
      data: tweet,
    });
  }

  async getMyFeed(req: Request, res: Response) {
    const followers = await UserFollower.distinct('followingId', { userId: req.user._id });

    // Add my own id to the list
    followers.push(new ObjectId(req.user._id));

    const tweets = await Tweet.find({ userId: { $in: followers } })
      .populate('userId', 'fname lname')
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.send({
      message: 'Feed Fetched!',
      data: tweets,
    });
  }

  async updateTweet(req: Request, res: Response) {
    const { id } = req.params;
    const { text } = req.body;

    const tweet = await Tweet.findOne({ _id: id, userId: req.user._id });

    if (!tweet) {
      return res.status(404).send({
        message: 'Tweet not found!',
      });
    }

    tweet.text = text;
    await tweet.save();

    return res.send({
      message: 'Tweet Updated!',
    });
  }

  async deleteTweet(req: Request, res: Response) {
    const { id } = req.params;

    const tweet = await Tweet.findOne({ _id: id, userId: req.user._id });

    if (!tweet) {
      return res.status(404).send({
        message: 'Tweet not found!',
      });
    }

    await Tweet.deleteOne({ _id: tweet._id });

    return res.send({
      message: 'Tweet Deleted!',
    });
  }
}

export default new TweetController();
