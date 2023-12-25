import jwt from '../utils/jwt.utils';

async function auth(req, res, next) {
  try {
    const token = req.headers['Authorization'];

    if (!token)
      return res.status(401).send({
        message: 'UnAuthorized',
      });

    req.user = await jwt.verify(token);
    next();
  } catch (error) {
    res.status(401).send({
      message: 'UnAuthorized',
    });
  }
}

export default auth;
