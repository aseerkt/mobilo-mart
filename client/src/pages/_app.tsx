import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import { useRouter } from 'next/router';
import '@fontsource/montserrat/700.css';
import theme from '../theme';
import Navbar from '../components/Navbar';

function ShowNavbar() {
  const router = useRouter();
  const showNavbar = !['/login', '/register'].includes(router.pathname);

  return <>{showNavbar && <Navbar />}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ShowNavbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
