import { Request, Response } from 'express';
import { ObjectId, User, UserFollower } from './../../models';

class UserController {
  async getAll(req: Request, res: Response) {
    const pipeline = [
      {
        $match: {
          _id: { $ne: new ObjectId(req.user._id) },
        },
      },
      {
        $lookup: {
          from: 'users_followers',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$followingId', '$$userId'] }, { $eq: ['$userId', new ObjectId(req.user._id)] }],
                },
              },
            },
            {
              $project: {
                flag: true,
              },
            },
          ],
          as: 'followers',
        },
      },
      {
        $unwind: {
          path: '$followers',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          fname: 1,
          lname: 1,
          followed: {
            $cond: ['$followers._id', true, false],
          },
        },
      },
    ];

    console.log(JSON.stringify(pipeline));

    const users = await User.aggregate(pipeline);

    return res.send({
      message: 'Get All Users!',
      data: users,
    });
  }

  async followUser(req: Request, res: Response) {
    const { userId, flag } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({
        message: 'User Not Found!',
      });
    }

    const userFollower = await UserFollower.findOne({
      userId: req.user._id,
      followingId: userId,
    });

    if (flag) {
      if (userFollower) {
        return res.status(400).send({
          message: 'User Already Followed!',
        });
      }

      // Create User Follower
      await new UserFollower({
        userId: req.user._id,
        followingId: userId,
      }).save();
    } else {
      if (!userFollower) {
        return res.status(400).send({
          message: 'User Not Followed!',
        });
      }

      // Delete User Follower
      await UserFollower.deleteOne({
        userId: req.user._id,
        followingId: userId,
      });
    }

    return res.send({
      message: 'success!',
    });
  }
}

export default new UserController();
