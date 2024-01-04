import { Schema, Types, model, models } from 'mongoose';
import { IUser, UserSchema } from '../User';
import { AddressSchema, IAddress } from './Address';
import { IOrderItem, OrderItemSchema } from './OrderItem';

interface IOrder {
  user: Types.Subdocument<IUser> | IUser;
  address: Types.Subdocument<IAddress> | IAddress;
  items: Types.ArraySubdocument<IOrderItem> | IOrderItem[];
}

const OrderSchema = new Schema<IOrder>({
  user: {
    type: UserSchema,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  items: [OrderItemSchema],
});

export default models.Order || model('Order', OrderSchema);
