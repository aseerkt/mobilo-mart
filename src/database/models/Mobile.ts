import { Schema, Types, model, models } from 'mongoose';
import { getFloatValue } from '../helpers';
import { IReview, ReviewSchema } from './Review';

export interface IMobile {
  name: string;
  price: number | typeof Types.Decimal128;
  discount: number | typeof Types.Decimal128;
  image: string;
  stars: number;
  numReviews: number;
  deliveryDays: number;
  fullfilled: boolean;
  keywords: string[];
  reviews: Types.Subdocument<IReview> | IReview;
}

export const MobileSchema = new Schema<IMobile>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Types.Decimal128,
    required: true,
    get: getFloatValue,
  },
  discount: {
    type: Types.Decimal128,
    get: getFloatValue,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Number,
    default: 0,
  },
  deliveryDays: {
    type: Number,
    default: 7,
  },
  fullfilled: {
    type: Boolean,
    default: false,
  },
  keywords: [{ type: String }],
  reviews: [ReviewSchema],
});

export default models.Mobile || model<IMobile>('Mobile', MobileSchema);
