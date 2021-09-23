import { DI } from '../app';
import OrderItem from '../entities/OrderItem';
import routeHandler from '../utils/routeHandler';
import Razorpay from 'razorpay-node-typescript';

interface RazorOrderBody {
  amount: number;
  receipt: string;
  notes: Record<string, string>;
}

interface PlaceOrderBody {
  orders: Partial<OrderItem>[];
}

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID!,
  key_secret: RAZORPAY_KEY_SECRET!,
});

export const setRazorOrder = routeHandler(async (req, res) => {
  const { amount, receipt, notes } = req.body as RazorOrderBody;
  const orderEntity = await instance.orders.create({
    amount,
    currency: 'INR',
    receipt,
    notes: notes as any,
  });
  return res.json(orderEntity);
});

export const placeOrder = routeHandler(async (req, res) => {
  const { orders } = req.body as PlaceOrderBody;

  const newOrders = DI.orderRepository.create(orders);

  await DI.em.persistAndFlush(newOrders);

  return res.json({ orders: newOrders });
});
