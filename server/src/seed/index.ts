import 'reflect-metadata';
import 'dotenv-safe/config';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import bcrypt from 'bcryptjs';
import User from '../entities/User';
import mobileData from './data';
import { v4 } from 'uuid';
import Mobile from '../entities/Mobile';
import { errorLog } from '../utils/chalkLogs';

let userData: Partial<User>[] = [
  {
    id: v4(),
    email: 'bob@gmail.com',
    name: 'Bob',
    password: process.env.SEED_PASSWORD!,
    admin: false,
  },
  {
    id: v4(),
    email: 'ben@gmail.com',
    name: 'Ben',
    password: process.env.SEED_PASSWORD!,
    admin: false,
  },
  {
    id: v4(),
    email: 'john@gmail.com',
    name: 'John',
    password: process.env.SEED_PASSWORD!,
    admin: true,
  },
];

async function seedMockData() {
  const orm = await MikroORM.init();
  const em = orm.em as EntityManager;
  const generator = orm.getSchemaGenerator();

  await generator.dropSchema();
  await generator.createSchema();

  const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD!, 12);

  userData = userData.map((u) => ({ ...u, password: hashedPassword }));

  await em.createQueryBuilder(User).insert(userData).execute('run');

  await em.createQueryBuilder(Mobile).insert(mobileData).execute('run');

  await orm.close();

  process.exit(0);
}

seedMockData().catch((err) => {
  console.error(errorLog(err));
  process.exit(1);
});
