import dbConnect from '..';
import Mobile from '../models/Mobile';
import products from './products';

const seed = async () => {
  console.log('Seed started');
  console.time('seed');

  await dbConnect();

  await Mobile.deleteMany();

  await Mobile.insertMany(products);

  console.log('Seed ended');
  console.timeEnd('seed');
};

seed();
