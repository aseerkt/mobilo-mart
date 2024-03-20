import bcrypt from 'bcrypt';
import dbConnect from 'database';
import User from 'database/models/User';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials, _req) {
        await dbConnect();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await User.findOne({ email }).select('+password');

        if (!user) throw new Error('Email/Password is incorrect');

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) throw new Error('Email/Password is incorrect');

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      token.id = token.id ?? user?.id;
      return token;
    },
    session({ token, session }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
