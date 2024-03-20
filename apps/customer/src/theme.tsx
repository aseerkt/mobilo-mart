import { extendTheme } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const fonts = {
  montserrat,
};

export default extendTheme({
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
  },
});
