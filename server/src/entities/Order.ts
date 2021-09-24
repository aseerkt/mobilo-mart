import { Entity, ManyToOne, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import Address from './Address';
import OrderItem from './OrderItem';
import User from './User';

@Entity({ tableName: 'orders' })
export default class Order {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Address)
  address: Address;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
