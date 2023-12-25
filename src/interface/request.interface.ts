import IUser from './user-session.interface';

interface IRequest extends Request {
  user?: IUser;
}

export default IRequest;
