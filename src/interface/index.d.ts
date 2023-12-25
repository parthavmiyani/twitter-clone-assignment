import IUserSession from './user-session.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUserSession;
    }
  }
}
