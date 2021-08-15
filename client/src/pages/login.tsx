import FormWrapper from '../components/FormWrapper';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Divider,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import InputField from '../shared/InputField';
import { Form, Formik } from 'formik';

function Login() {
  return (
    <FormWrapper title='Login'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async function (values) {}}
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
