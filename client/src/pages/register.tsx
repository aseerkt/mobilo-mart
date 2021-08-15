import { Button, Divider, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import FormWrapper from '../components/FormWrapper';
import InputField from '../shared/InputField';

function Register() {
  return (
    <FormWrapper title='Sign Up'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async function (values) {}}
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
