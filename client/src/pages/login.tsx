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

function Login() {
  return (
    <FormWrapper title='Login'>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input variant='filled' type='email' />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input variant='filled' type='password' />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>

      <Button marginY='5' colorScheme='teal' type='submit'>
        Sign In
      </Button>

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
