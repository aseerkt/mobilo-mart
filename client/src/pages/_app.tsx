import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SWRConfig } from 'swr';
import theme from '../theme';
import Navbar from '../components/Navbar';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function ShowNavbar() {
  const router = useRouter();
  const showNavbar = !['/login', '/register'].includes(router.pathname);

  return <>{showNavbar && <Navbar />}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher, refreshInterval: 10000 }}>
      <ChakraProvider theme={theme}>
        <ShowNavbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
