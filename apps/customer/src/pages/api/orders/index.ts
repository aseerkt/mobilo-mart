import Order from '@/database/models/Order';
import { OrderItemStatus } from '@/database/models/Order/OrderItem';
import { attachTokenToRequest, makeDbConnection } from '@/libs/middlewares';
import { Types } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(makeDbConnection)
  .use(attachTokenToRequest)
  .get(async (req, res) => {
    const orders = await Order.find({
      'user._id': new Types.ObjectId(req.token.id),
    });
    res.json(orders);
  })
  .post(async (req, res) => {
    const {
      orderItems,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
      address,
    } = req.body;
    const isPaymentVerified = validatePaymentVerification(
      { order_id: orderId, payment_id: razorpayPaymentId },
      razorpaySignature,
      process.env.RAZORPAY_KEY_SECRET
    );

    if (!isPaymentVerified)
      res.status(400).json({ message: 'Payment verification failed' });

    console.log('payment verified::', isPaymentVerified);

    const order = await Order.create({
      user: {
        name: req.token.name,
        email: req.token.email,
        _id: req.token.id,
      },
      address: Object.assign(address, { userId: req.token.id }),
      items: orderItems.map((item) => ({
        qty: item.qty,
        product: item.product,
        status: OrderItemStatus.PAID,
      })),
    });

    res.status(201).json({ ok: true, order });
  });

export default router.handler();
