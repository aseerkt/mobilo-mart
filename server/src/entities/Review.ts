import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import Mobile from './Mobile';
import User from './User';

@Entity({ tableName: 'reviews' })
export default class Review {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Mobile)
  mobile: Mobile;

  @Property()
  rating: number = 3;

  @Property()
  title: string;

  @Property({ type: 'text' })
  body: string;

  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
