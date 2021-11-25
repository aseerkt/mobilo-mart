import { AppProps } from 'next/app';
import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import theme from '@/theme';
import Navbar from '@/components/Navbar';
import fetcher from '@/libs/fetcher';
import { Provider, useHydrate } from '../store';

function ShowNavbar() {
  const router = useRouter();
  const showNavbar = !['/login', '/register'].includes(router.pathname);

  return <>{showNavbar && <Navbar />}</>;
}

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const store = useHydrate(pageProps.initialZustandState);

  return (
    <Provider createStore={store}>
      <SWRConfig value={{ fetcher, dedupingInterval: 10000 }}>
        <ChakraProvider theme={theme}>
          <GlobalStyle />
          <ShowNavbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
