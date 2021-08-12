import { CookieOptions, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

const __PROD__ = process.env.NODE_ENV === 'production';

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = 'mobilo-auth';
const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: __PROD__,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: __PROD__ ? 'none' : 'lax',
};

export function setCookie(res: Response, user: Prisma.UserWhereInput) {
  res.cookie(
    COOKIE_NAME,
    jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' }),
    COOKIE_OPTIONS
  );
}

export function removeCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
}
