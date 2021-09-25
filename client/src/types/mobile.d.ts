import { User } from './user';

export interface Review {
  id: string;
  mobile: string;
  user: User;
  rating: number;
  title: string;
  body?: string;
  createdAt: Date;
}

export interface Mobile {
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
  reviews: Review[];
}
