import express from 'express';
import { MikroORM, EntityRepository, RequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

// Entities
import User from './entities/User';
import Mobile from './entities/Mobile';
import OrderItem from './entities/OrderItem';
import Review from './entities/Review';

// Routes
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

// Middlewares
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middlewares/errorMiddleware';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  mobileRepository: EntityRepository<Mobile>;
  orderRepository: EntityRepository<OrderItem>;
  reviewRepository: EntityRepository<Review>;
};

export default async function createApp() {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em as EntityManager;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.mobileRepository = DI.orm.em.getRepository(Mobile);
  DI.orderRepository = DI.orm.em.getRepository(OrderItem);
  DI.reviewRepository = DI.orm.em.getRepository(Review);

  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));

  app.get('/', (_, res) => res.send('Welcome to Mobilo Mart Server'));

  app.use(cookieParser());

  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return { app };
}
