import dotenv from 'dotenv';
import path from 'path';
import dbConnect from '..';
import Mobile from '../models/Mobile';
import products from './products';

const seed = async () => {
  console.log('Seed started');
  console.time('seed');

  const envs = dotenv.config({
    path: path.resolve(process.cwd(), '.env.local'),
  }).parsed;

  await dbConnect(envs.MONGODB_URI);

  await Mobile.deleteMany();

  await Mobile.insertMany(products);

  console.log('Seed ended');
  console.timeEnd('seed');
};

seed();
