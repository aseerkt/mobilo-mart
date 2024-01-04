import { attachTokenToRequest, makeDbConnection } from '@/libs/middlewares';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(makeDbConnection)
  .use(attachTokenToRequest)
  .post(async (req, res) => {
    const result = await instance.orders.create({
      amount: req.body.amount as string,
      receipt: req.body.receipt as string,
      currency: 'INR',
      notes: req.body.notes as Record<string, string>,
      customer_id: req.token.id,
    });
    res.json(result);
  });

export default router.handler();
