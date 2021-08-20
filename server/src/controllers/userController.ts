import { RequestHandler, Response } from 'express';
import routeHandler from '../utils/routeHandler';
import expressAsyncHandler from 'express-async-handler';
import { removeCookie, setCookie } from '../utils/tokenCookieHandler';
import User from '../entities/User';
import { DI } from '../app';

const GRAVATAR_PLACEHOLDER =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export const register: RequestHandler<any, any, User> = routeHandler(
  async function (req, res) {
    const { email, password, name } = req.body;
    const emailExists = await DI.userRepository.findOne({
      email,
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

    const user = DI.userRepository.create({
      email,
      name,
      password,
      avatar: GRAVATAR_PLACEHOLDER,
    });

    DI.em.persistAndFlush(user);

    setCookie(res, user);
    return res.status(201).json({ user: { ...user, password: undefined } });
  }
);

export const login: RequestHandler = expressAsyncHandler(async function (
  req,
  res
) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await DI.userRepository.findOne({ email });

  if (!user) {
    return res.status(400).json({
      errors: [{ path: 'email', message: 'Email is not registered' }],
    });
  }
  if (!(await user.verifyPassword(password))) {
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
  const user = await DI.userRepository.findOne({
    id: userId,
  });
  res.json({ user });
});

export const logout: RequestHandler = expressAsyncHandler(async function (
  _req,
  res: Response
) {
  removeCookie(res);
  res.locals.userId = undefined;
  return res.send('Logout successfull');
});
