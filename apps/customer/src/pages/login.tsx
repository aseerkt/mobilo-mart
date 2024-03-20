import FormWrapper from '@/components/FormWrapper';
import {
  Button,
  Divider,
  HStack,
  Link,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { InputField } from 'ui/components';

// TODO: yup client side form validation

function Login() {
  const toast = useToast();
  const [loadingGuestUser, setLoadingGuestUser] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, status } = useSession();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
          description: 'Login successful.',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const res = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      if (res.error) {
        toast({
          title: 'Login failed',
          description: res.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Login failed',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  });

  return (
    <FormWrapper title='Login'>
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <InputField label='Email' name='email' control={form.control} />
          <InputField
            label='Password'
            type='password'
            control={form.control}
            name='password'
          />
        </VStack>

        <HStack spacing={3}>
          <Button
            isLoading={form.formState.isSubmitting}
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
      </form>
      <Divider marginBottom='5' />
      <Text fontSize='small'>
        Don&apos;t have an account?{' '}
        <Link colorScheme='blue' as={NextLink} href='/register'>
          Register
        </Link>
      </Text>
    </FormWrapper>
  );
}

export default Login;
