import { BigIntType, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'addresses' })
export default class Address {
  @PrimaryKey()
  id: string = v4();

  @Property()
  fullName: string;

  @Property({ type: BigIntType })
  mobileNumber: number;

  @Property()
  emailAddress: string;

  @Property({ type: 'text' })
  streetAddress: string;

  @Property()
  city: string;

  @Property()
  state: string;
}
