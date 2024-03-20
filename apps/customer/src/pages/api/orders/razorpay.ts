import { attachTokenToRequest, makeDbConnection } from '@/libs/middlewares';
import rzInstance from '@/libs/razorpay';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(makeDbConnection)
  .use(attachTokenToRequest)
  .post(async (req, res) => {
    try {
      const result = await rzInstance.orders.create({
        amount: req.body.amount as string,
        receipt: req.body.receipt as string,
        currency: 'INR',
        notes: req.body.notes as Record<string, string>,
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

export default router.handler();
