import jwt from 'jsonwebtoken';

class JWT {
  verify(token: string): any {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }

  sign(data: object) {
    return jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: '7d' });
  }
}

export default new JWT();
