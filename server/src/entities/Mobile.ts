import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import Review from './Review';

@Entity({ tableName: 'mobiles' })
export default class Mobile {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'text' })
  name!: string;

  @Property()
  image!: string;

  @Property({ type: 'float' })
  price!: number;

  @Property()
  discount: number;

  @Property({ type: 'float' })
  stars: number = 0;

  @Property()
  numReviews: number = 0;

  @Property()
  deliveryDays: number = 7;

  @Property()
  fullfilled: boolean = false;

  @Property()
  keywords: string[];

  @OneToMany(() => Review, (review) => review.mobile)
  reviews: Review[];
}
