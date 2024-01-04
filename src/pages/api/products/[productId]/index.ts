import Mobile from '@/database/models/Mobile';
import { makeDbConnection } from '@/libs/middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(makeDbConnection).get(async (req, res) => {
  const product = await Mobile.findById(req.query.productId);
  return res.status(200).json(product);
});

export default router.handler();
