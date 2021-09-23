import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import User from './User';
import Mobile from './Mobile';

export enum OrderItemStatus {
  CANCELLED = 'cancelled',
  PAID = 'paid',
}

@Entity({ tableName: 'order-items' })
export default class OrderItem {
  @PrimaryKey()
  id: string = v4();

  @Property()
  qty: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Mobile)
  Mobile: Mobile;

  @Enum({
    type: 'OrderItemStatus',
    items: () => OrderItemStatus,
  })
  status: OrderItemStatus;
}
