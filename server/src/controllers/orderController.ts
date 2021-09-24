import { DI } from '../app';
import OrderItem from '../entities/OrderItem';
import routeHandler from '../utils/routeHandler';
import Razorpay from 'razorpay-node-typescript';
import { v4 } from 'uuid';
import { EntityData, LoadStrategy } from '@mikro-orm/core';
import Address from '../entities/Address';
import Order from '../entities/Order';

interface RazorOrderBody {
  amount: number;
  receipt: string;
  notes: Record<string, string>;
}

interface PlaceOrderBody {
  orders: {
    mobile: string;
    qty: number;
  }[];
  address: Address;
}

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

// https://razorpay.com/docs/payment-gateway/web-integration/standard/#step-1-create-an-order-from-your-server

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID!,
  key_secret: RAZORPAY_KEY_SECRET!,
});

export const getMyOrders = routeHandler(async (_req, res) => {
  const myOrders = await DI.orderRepository.find(
    { user: res.locals.userId },
    { populate: { items: LoadStrategy.JOINED, address: LoadStrategy.JOINED } }
  );
  await DI.em.populate(myOrders, ['items.mobile']);
  return res.json(myOrders);
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
  const { orders, address } = req.body as PlaceOrderBody;
  await DI.em.transactional(async (em) => {
    let orderAddress = await em
      .getRepository(Address)
      .findOne({ id: address.id });
    if (!orderAddress) {
      orderAddress = em.getRepository(Address).create(address);
      await em.persistAndFlush(orderAddress);
    }
    const newOrder = em.getRepository(Order).create({
      address: orderAddress.id,
      user: res.locals.userId,
    });
    await em.persistAndFlush(newOrder);
    const ordersData: EntityData<OrderItem>[] = orders.map((item) => ({
      id: v4(),
      ...item,
      order: newOrder.id,
      createdAt: new Date(),
    }));
    await em
      .createQueryBuilder(OrderItem)
      .insert(ordersData)
      .execute<OrderItem[]>('run');
  });

  return res.json({ ok: true });
});
