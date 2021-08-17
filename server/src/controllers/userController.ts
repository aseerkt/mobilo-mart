import { RequestHandler, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { hashPassword, verfiyPassword } from '../utils/passwordHandler';
import routeHandler from '../utils/routeHandler';
import expressAsyncHandler from 'express-async-handler';
import { removeCookie, setCookie } from '../utils/tokenCookieHandler';

const GRAVATAR_PLACEHOLDER =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export const register: RequestHandler<any, any, Prisma.UserCreateInput> =
  routeHandler(async function (req, res) {
    const { email, password, name } = req.body;
    const emailExists = await prisma.user.findUnique({
      where: { email },
      select: {
        password: false,
      },
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
    setCookie(res, user);
    return res.status(201).json({ user: { ...user, password: undefined } });
  });

export const login: RequestHandler = expressAsyncHandler(async function (
  req,
  res
) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({
      errors: [{ path: 'email', message: 'Email is not registered' }],
    });
  }
  if (!(await verfiyPassword(user.password, password))) {
    return res
      .status(400)
      .json({ errors: [{ path: 'password', message: 'Incorrect password' }] });
  }

  setCookie(res, user);
  return res.json({
    user: {
      ...user,
      password: undefined,
    },
  });
});

export const me: RequestHandler = expressAsyncHandler(async function (
  _req,
  res
) {
  const { userId } = res.locals;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  res.json({ user: { ...user, password: undefined } });
});

export const logout: RequestHandler = expressAsyncHandler(async function (
  _req,
  res: Response
) {
  removeCookie(res);
  res.locals.userId = undefined;
  return res.send('Logout successfull');
});
