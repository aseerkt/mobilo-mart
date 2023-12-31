import { useState } from 'react';
import FormWrapper from '@/components/FormWrapper';
import {
  Button,
  Divider,
  Text,
  Link,
  useToast,
  HStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import InputField from '@/shared/InputField';
import { Form, Formik } from 'formik';
import axios from 'axios';
import useUser from '@/libs/useUser';
import { useRouter } from 'next/router';

// TODO: yup client side form validation

function Login() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { revalidate } = useUser();

  return (
    <FormWrapper title='Login'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async function (values) {
          try {
            const res = await axios('/users/login', {
              method: 'POST',
              data: values,
            });
            const user = res.data?.user;
            if (user && (await revalidate())) {
              toast({
                title: `Welcome ${user?.name}.`,
                description: 'Login successfull.',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              router.push('/');
            }
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

            console.error(err);
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
                isLoading={loading}
                colorScheme='teal'
                variant='outline'
                typ='button'
                onClick={async () => {
                  try {
                    setLoading(true);
                    const res = await axios('/users/login', {
                      method: 'POST',
                      data: { isTest: true },
                    });
                    const user = res.data?.user;
                    if (user && (await revalidate())) {
                      toast({
                        title: `Welcome ${user?.name}.`,
                        description: 'Login successfull.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      });
                      setLoading(false);
                      router.push('/');
                    }
                  } catch (err) {
                    setLoading(false);
                    console.error(err);
                  }
                }}
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
