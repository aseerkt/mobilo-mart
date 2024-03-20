import { Schema, Types } from 'mongoose';
import { IUser, PublicUserSchema } from './User';

export interface IReview {
  rating: number;
  title: string;
  body?: string;
  user: Types.Subdocument<IUser> | IUser;
}

export const ReviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      default: 3,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    user: {
      type: PublicUserSchema,
      required: true,
    },
  },
  { timestamps: true }
);
