import { Schema } from 'mongoose';
import { IMobile, MobileSchema } from '../Mobile';

export const OrderItemStatus = {
  CANCELLED: 'cancelled',
  PAID: 'paid',
} as const;

export interface IOrderItem {
  qty: number;
  product: Omit<IMobile, 'reviews'>;
  status: (typeof OrderItemStatus)[keyof typeof OrderItemStatus];
}

export const OrderItemSchema = new Schema<IOrderItem>(
  {
    qty: {
      type: Number,
      required: true,
    },
    product: {
      type: MobileSchema,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderItemStatus),
    },
  },
  { timestamps: true }
);
