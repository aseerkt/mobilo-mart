import { BeforeCreate, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

@Entity({ tableName: 'users' })
export default class User {
  @PrimaryKey()
  id: string = v4();

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  name!: string;

  @Property({ type: 'text' })
  password!: string;

  @Property({ default: false })
  admin: boolean = false;

  @BeforeCreate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
