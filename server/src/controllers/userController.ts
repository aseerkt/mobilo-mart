import { RequestHandler, Response } from 'express';
import { asyncHandler, validateHandler } from '../utils/routeHandler';
import { removeCookie, setCookie } from '../utils/tokenCookieHandler';
import { DI } from '../app';

const GRAVATAR_PLACEHOLDER =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

interface LoginBody {
  email: string;
  password: string;
  isTest?: boolean;
}

interface RegisterBody extends LoginBody {
  name: string;
}

export const register: RequestHandler = validateHandler(async function (
  req,
  res
) {
  const { email, password, name } = req.body as RegisterBody;
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

  await DI.em.persistAndFlush(user);

  setCookie(res, user);
  return res.status(201).json({ user: { ...user, password: undefined } });
});

export const login: RequestHandler = asyncHandler(async function (req, res) {
  const { email, password, isTest } = req.body as LoginBody;
  if (isTest) {
    const testUser = await DI.userRepository.findOne({
      email: 'bob@gmail.com',
    });
    setCookie(res, testUser!);
    return res.json({ user: { ...testUser, password: undefined } });
  }
  const user = await DI.userRepository.findOne({ email });
  if (!user) {
    return res.status(400).json({
      errors: [{ path: 'email', message: 'Email is not registered' }],
    });
  }
  if (!(await user.verifyPassword(password))) {
    return res.status(400).json({
      errors: [{ path: 'password', message: 'Incorrect password' }],
    });
  }

  setCookie(res, user);
  return res.json({
    user: {
      ...user,
      password: undefined,
    },
  });
});

export const me: RequestHandler = asyncHandler(async function (_req, res) {
  const { userId } = res.locals;
  const user = await DI.userRepository.findOne({
    id: userId,
  });
  res.json({ user });
});

export const logout: RequestHandler = asyncHandler(async function (
  _req,
  res: Response
) {
  removeCookie(res);
  res.locals.userId = undefined;
  return res.send('Logout successfull');
});
