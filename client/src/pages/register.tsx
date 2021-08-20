import { Button, Divider, Link, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import FormWrapper from '../components/FormWrapper';
import useUser from '../libs/useUser';
import InputField from '../shared/InputField';

// TODO: yup client side form validation

function Register() {
  const toast = useToast();
  const router = useRouter();
  const { revalidate } = useUser();
  return (
    <FormWrapper title='Sign Up'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async function (values) {
          try {
            const res = await axios('/users', {
              method: 'POST',
              data: values,
            });
            const user = res.data?.user;
            if (user && (await revalidate())) {
              toast({
                title: 'Account created.',
                description: "We've created your account for you.",
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
