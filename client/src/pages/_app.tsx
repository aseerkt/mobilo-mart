import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import theme from '@/theme';
import Navbar from '@/components/Navbar';
import fetcher from '@/libs/fetcher';
import { hydrateStore } from '@/store/cartStore';

function ShowNavbar() {
  const router = useRouter();
  const showNavbar = !['/login', '/register'].includes(router.pathname);

  return <>{showNavbar && <Navbar />}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  const { initialState } = pageProps;
  hydrateStore(initialState);

  return (
    <SWRConfig value={{ fetcher, dedupingInterval: 10000 }}>
      <ChakraProvider theme={theme}>
        <ShowNavbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
