import { Orders } from 'razorpay/dist/types/orders';
import { serverApi } from '../fetcher';

export const getRazorpayOrderId = (payload) => {
  return serverApi
    .post(payload, '/api/orders/razorpay')
    .json<Orders.RazorpayOrder>();
};

export const createOrder = (payload) => {
  return serverApi.post(payload, '/api/orders').json<{ ok: boolean }>();
};
