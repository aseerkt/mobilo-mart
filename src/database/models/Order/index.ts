import { Schema, Types, model, models } from 'mongoose';
import { IUser, PublicUserSchema } from '../User';
import { AddressSchema, IAddress } from './Address';
import { IOrderItem, OrderItemSchema } from './OrderItem';

interface IOrder {
  user: Types.Subdocument<IUser> | IUser;
  address: Types.Subdocument<IAddress> | IAddress;
  items: Types.ArraySubdocument<IOrderItem> | IOrderItem[];
}

const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: PublicUserSchema,
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    items: [OrderItemSchema],
  },
  { timestamps: true }
);

OrderSchema.index({ 'user._id': 1 });

export default models.Order || model('Order', OrderSchema);
