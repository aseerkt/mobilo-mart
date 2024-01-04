import Mobile from '@/database/models/Mobile';
import { makeDbConnection } from '@/libs/middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(makeDbConnection).get(async (_req, res) => {
  const mobiles = await Mobile.find({});
  res.status(200).json(mobiles);
});

export default router.handler();
