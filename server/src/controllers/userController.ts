import { RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { hashPassword } from '../utils/passwordHandler';
import routeHandler from '../utils/routeHandler';

const GRAVATAR_PLACEHOLDER =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export const register: RequestHandler<any, any, Prisma.UserCreateInput> =
  routeHandler(async function (req, res) {
    const { email, password, name } = req.body;
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExists)
      return res.status(400).json({
        errors: [
          {
            path: 'email',
            message: 'Email is already taken',
          },
        ],
      });

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatar: GRAVATAR_PLACEHOLDER,
      },
    });
    return res.status(201).json({ user });
  });
