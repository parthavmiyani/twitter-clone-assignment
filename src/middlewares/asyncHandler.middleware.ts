import { NextFunction, Request, Response } from 'express';

type AsyncHandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (fn: AsyncHandlerFunction) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch((err) => {
    console.log(err);
    return res.send({
      message: 'Internal server error',
    });
  });
};

export default asyncHandler;
