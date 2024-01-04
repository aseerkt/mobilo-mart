import User from '@/database/models/User';
import { makeDbConnection } from '@/libs/middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(makeDbConnection).get(async (req, res) => {
  const token = await getToken({ req });
  if (token?.email) {
    const user = await User.findOne({ email: token.email });
    res.json(user);
  } else {
    res.status(401).send('Unauthenticated');
  }
});

export default router.handler();
