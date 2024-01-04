import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
  }
}

declare module 'next' {
  interface NextApiRequest {
    token?: import('next-auth/jwt').JWT;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NEXTAUTH_SECRET: string;

      SMTP_USER: string;
      SMTP_PASSWORD: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      EMAIL_FROM: string;

      NEXT_PUBLIC_RAZORPAY_KEY_ID: string;
      RAZORPAY_KEY_SECRET: string;
    }
  }
}
