import jwt from 'jsonwebtoken';

export const verify = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
};

export const sign = (data: object) => {
  return jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: '7d' });
};
