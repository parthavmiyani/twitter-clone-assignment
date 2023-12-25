import { verify } from '../utils/jwt.utils';

async function auth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
      return res.status(401).send({
        message: 'UnAuthorized',
      });

    req.user = await verify(token);
    next();
  } catch (error) {
    res.status(401).send({
      message: 'UnAuthorized',
    });
  }
}

export default auth;
