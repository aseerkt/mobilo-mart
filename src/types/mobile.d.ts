import { User } from './user';

export interface IReview {
  _id: string;
  mobile: string;
  user: User;
  rating: number;
  title: string;
  body?: string;
  createdAt: Date;
}

export interface IMobile {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  stars: number;
  numReviews: number;
  deliveryDays: number;
  fullfilled: boolean;
  keywords: string[];
  reviews: IReview[];
}
