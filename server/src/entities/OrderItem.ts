import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import Mobile from './Mobile';
import Order from './Order';

export enum OrderItemStatus {
  CANCELLED = 'cancelled',
  PAID = 'paid',
}

@Entity({ tableName: 'order_items' })
export default class OrderItem {
  @PrimaryKey()
  id: string = v4();

  @Property()
  qty: number;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Mobile)
  mobile: Mobile;

  @Enum({
    type: 'OrderItemStatus',
    items: () => OrderItemStatus,
    default: OrderItemStatus.PAID,
  })
  status: OrderItemStatus;

  @Property({ type: 'date' })
  createdAt = new Date();
}
