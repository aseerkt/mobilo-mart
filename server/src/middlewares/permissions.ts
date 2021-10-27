import { Request, Response, RequestHandler } from 'express';
import { asyncHandler } from '../utils/routeHandler';
import { getToken, verifyToken } from '../utils/tokenCookieHandler';

function setAuthLocals(req: Request, res: Response) {
  const token = getToken(req);
  const payload: any = verifyToken(token);
  res.locals.userId = payload.userId;
}

export const requireAuth: RequestHandler = asyncHandler(async function (
  req,
  res,
  next
) {
  try {
    setAuthLocals(req, res);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send('Not authenticated');
  }
});

export const checkAuth: RequestHandler = asyncHandler(async function (
  req,
  res,
  next
) {
  try {
    setAuthLocals(req, res);
  } catch (err) {
    console.log(err);
  }
  return next();
});
