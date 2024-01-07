import { Address } from './address';
import { IMobile } from './mobile';
import { User } from './user';

export interface OrderItem {
  id: string;
  qty: number;
  mobile: IMobile;
  status: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  address: Address;
}
