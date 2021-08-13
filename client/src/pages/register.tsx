import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Divider,
  Link,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import FormWrapper from '../components/FormWrapper';

function Register() {
  return (
    <FormWrapper title='Sign Up'>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input variant='filled' type='text' />
        <FormHelperText></FormHelperText>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>

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
        Sign Up
      </Button>

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
