import dbConnect from '@/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextHandler } from 'next-connect';

export const makeDbConnection = async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  next: NextHandler
) => {
  await dbConnect();
  await next();
};

export const attachTokenToRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const token = await getToken({ req });
  if (!token) return res.status(401).send('Unauthenticated');
  req.token = token;
  await next();
};
