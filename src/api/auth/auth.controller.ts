import { Request, Response } from 'express';
import { User } from './../../models';
import { sign } from './../../utils/jwt.utils';
import { hashPassword, comparePassword } from './../../utils/bcrypt.utils';

class AuthController {
  async register(req: Request, res: Response) {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).send({
        message: 'User Already Exists!',
      });
    }

    req.body.password = await hashPassword(req.body.password);
    const userObj = await new User(req.body).save();

    const payload = {
      _id: userObj._id,
      fname: userObj.fname,
      lname: userObj.lname,
      email: userObj.email,
    };
    const token = sign(payload);

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
      return res.status(401).send({
        message: 'Invalid Credentials!',
      });
    }

    const isMatch = await comparePassword(req.body.password, userObj.password);
    if (!isMatch) {
      return res.status(401).send({
        message: 'Invalid Credentials!',
      });
    }

    const payload = {
      _id: userObj._id,
      fname: userObj.fname,
      lname: userObj.lname,
      email: userObj.email,
    };
    const token = sign(payload);

    return res.send({
      message: 'User Logged In Successfully!',
      data: { token, ...payload },
    });
  }
}

export default new AuthController();
