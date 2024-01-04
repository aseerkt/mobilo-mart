import fetcher from '@/libs/fetcher';
import theme, { fonts } from '@/theme';
import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SWRConfig } from 'swr';
import { Provider, useHydrate } from '../store';

const Navbar = dynamic(() => import('../components/Navbar'));

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

  const swrConfig = {
    fetcher,
    dedupingInterval: 10000,
    fallback: pageProps.fallback,
  };

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-montserrat: ${fonts.montserrat.style.fontFamily};
          }
        `}
      </style>
      <Provider createStore={store}>
        <SessionProvider session={pageProps.session}>
          <SWRConfig value={swrConfig}>
            <ChakraProvider theme={theme}>
              <GlobalStyle />
              <ShowNavbar />
              <Component {...pageProps} />
            </ChakraProvider>
          </SWRConfig>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default MyApp;
