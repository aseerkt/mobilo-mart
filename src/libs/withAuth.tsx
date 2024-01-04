import Layout from '@/shared/Layout';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactNode, useEffect } from 'react';

interface WithAuthProps {
  title: string;
}

const withAuth =
  ({ title }: WithAuthProps) =>
  (Component: React.FC) =>
  (props: JSX.IntrinsicAttributes & { children?: ReactNode }) => {
    const { status } = useSession();
    const toast = useToast();

    if (status === 'authenticated') {
      return (
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...props} />
        </>
      );
    }

    useEffect(() => {
      if (status === 'unauthenticated') {
        signIn();
        toast({
          id: 'Not Authenticated',
          title: 'User not logged in',
          description: 'Login to proceed further',
          duration: 2000,
          isClosable: true,
          status: 'error',
        });
      }
    }, [status]);

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
