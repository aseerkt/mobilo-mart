import { Spinner, useToast, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import router from 'next/router';
import { ReactNode } from 'react';
import Layout from '@/shared/Layout';
import useUser from './useUser';

interface WithAuthProps {
  title: string;
}

const withAuth =
  ({ title }: WithAuthProps) =>
  (Component: React.FC) =>
  (props: JSX.IntrinsicAttributes & { children?: ReactNode }) => {
    const { loading, error, user } = useUser();
    const toast = useToast();

    if (user) {
      return (
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...props} />
        </>
      );
    }

    if (!loading && !user) {
      router.replace('/');
      toast({
        id: 'Not Authenticated',
        title: 'User not logged in',
        description: 'Login to proceed further',
        duration: 2000,
        isClosable: true,
        status: 'error',
      });
    }

    return (
      <Layout>
        <Head>
          <title>{title}</title>
        </Head>
        <Flex h='full' justify='center' align='center'>
          <Spinner size='xl' />
        </Flex>
      </Layout>
    );
  };

export default withAuth;
