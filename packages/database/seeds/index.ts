import dotenv from 'dotenv';
import path from 'path';
import dbConnect from '..';
import Mobile from '../models/Mobile';
import User from '../models/User';
import products from './products';
import users from './users';

const seed = async () => {
  console.log('Seed started');
  console.time('seed');

  const envs = dotenv.config({
    path: path.resolve(process.cwd(), '.env.local'),
  }).parsed;

  if (!envs) {
    console.log('No env variables found');
    process.exit(1);
  }

  await dbConnect(envs.MONGODB_URI);

  await Mobile.deleteMany();
  await User.deleteMany({ email: { $in: users.map((u) => u.email) } });

  await Mobile.insertMany(products);
  await Mobile.insertMany(users);

  console.log('Seed ended');
  console.timeEnd('seed');
};

seed();
