import { makeDbConnection } from '@/libs/middlewares';
import bcrypt from 'bcrypt';
import User from 'database/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(makeDbConnection).post(async (req, res) => {
  const { email, password, name } = req.body;
  const existingUserCount = await User.countDocuments({
    email,
  });
  if (existingUserCount)
    return res.status(400).json({
      message: 'Email is already taken',
    });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ email, name, password: hash });

  res.status(200).json(user);
});

export default router.handler();
