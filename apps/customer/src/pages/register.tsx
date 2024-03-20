import FormWrapper from '@/components/FormWrapper';
import { registerUser } from '@/libs/services/users';
import InputField from '@/shared/InputField';
import { Button, Divider, Link, Text, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// TODO: yup client side form validation

function Register() {
  const toast = useToast();
  const router = useRouter();
  return (
    <FormWrapper title='Sign Up'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async function (values) {
          try {
            const res = await registerUser(values);
            if (res._id) {
              toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              router.push('/login');
            }
          } catch (err) {
            console.error(err);
            toast({
              title: 'Invalid form data',
              description: err.response.data.message || err.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label='Name' isRequired name='name' />
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
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>

      <Divider marginBottom='5' />
      <Text fontSize='small'>
        Already have an account?{' '}
        <Link colorScheme='blue' as={NextLink} href='/login'>
          Sign In
        </Link>
      </Text>
    </FormWrapper>
  );
}

export default Register;
