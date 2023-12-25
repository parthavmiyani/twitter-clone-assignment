import { Request, Response } from 'express';
import { User } from 'src/models';
import jwt from 'src/utils/jwt.utils';

class AuthController {
  async register(req: Request, res: Response) {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(409).send({
        message: 'User Already Exists!',
      });
    }

    const userObj = await new User(req.body).save();

    const payload = {
      _id: userObj._id,
      fname: userObj.fname,
      lname: userObj.lname,
      email: userObj.email,
    };
    const token = jwt.sign(payload);

    return res.send({
      message: 'User Registered Successfully!',
      data: { token, ...payload },
    });
  }

  async login(req: Request, res: Response) {
    const userObj = await User.findOne({
      email: req.body.email,
    });

    if (!userObj) {
      return res.status(401).send('User Not Found!');
    }
  }
}

export default new AuthController();
