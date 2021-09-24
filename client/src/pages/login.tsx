import FormWrapper from '@/components/FormWrapper';
import { Button, Divider, Text, Link, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import InputField from '@/shared/InputField';
import { Form, Formik } from 'formik';
import axios from 'axios';
import useUser from '@/libs/useUser';
import { useRouter } from 'next/router';

// TODO: yup client side form validation

function Login() {
  const toast = useToast();
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

            <Button
              isLoading={isSubmitting}
              marginY='5'
              colorScheme='teal'
              type='submit'
            >
              Sign In
            </Button>
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
