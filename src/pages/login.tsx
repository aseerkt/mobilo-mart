import FormWrapper from '@/components/FormWrapper';
import InputField from '@/shared/InputField';
import {
  Button,
  Divider,
  HStack,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';

// TODO: yup client side form validation

function Login() {
  const toast = useToast();
  const [loadingGuestUser, setLoadingGuestUser] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, status } = useSession();

  const guestLoginCredentials = {
    email: 'test@email.com',
    password: 'Test@123',
  };

  const handleGuestLogin = async () => {
    try {
      setLoadingGuestUser(true);
      await signIn('credentials', guestLoginCredentials);
    } catch (err) {
      setLoadingGuestUser(false);
      console.error(err);
    }
  };

  useEffect(() => {
    const handleSuccessLogin = async () => {
      if (status === 'authenticated' && data.user) {
        toast({
          title: `Welcome ${data.user.name}.`,
          description: 'Login successfull.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        await mutate('/api/users');
        if (loadingGuestUser) setLoadingGuestUser(false);
        router.push('/');
      }
    };

    handleSuccessLogin();
  }, [status]);

  return (
    <FormWrapper title='Login'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async function (values) {
          try {
            await signIn('credentials', { ...values, redirect: false });
          } catch (err) {
            if (err.response.data) {
              toast({
                title: 'Login failed',
                description: err.response?.data?.errors
                  .map(({ path, message }) => message)
                  .join(', '),
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label='Email' isRequired name='email' />
            <InputField
              label='Password'
              isRequired
              type='password'
              name='password'
            />

            <HStack spacing={3}>
              <Button
                isLoading={isSubmitting}
                marginY='5'
                colorScheme='teal'
                type='submit'
              >
                Sign In
              </Button>
              <Button
                marginY='5'
                isLoading={loadingGuestUser}
                colorScheme='teal'
                variant='outline'
                type='button'
                onClick={handleGuestLogin}
              >
                Login as Guest
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
      <Divider marginBottom='5' />
      <Text fontSize='small'>
        Don't have an account?{' '}
        <Link colorScheme='blue' as={NextLink} href='/register'>
          Register
        </Link>
      </Text>
    </FormWrapper>
  );
}

export default Login;
