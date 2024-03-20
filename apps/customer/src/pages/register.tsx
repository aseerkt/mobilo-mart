import FormWrapper from '@/components/FormWrapper';
import { registerUser } from '@/libs/services/users';
import { Button, Divider, Link, Text, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { InputField } from 'ui/components';

// TODO: yup client side form validation

function Register() {
  const toast = useToast();
  const router = useRouter();

  const form = useForm({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async function (values) {
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
  });

  return (
    <FormWrapper title='Sign Up'>
      <form onSubmit={onSubmit}>
        <InputField label='Name' control={form.control} name='name' />
        <InputField label='Email' control={form.control} name='email' />
        <InputField
          label='Password'
          control={form.control}
          type='password'
          name='password'
        />

        <Button
          isLoading={form.formState.isSubmitting}
          marginY='5'
          colorScheme='teal'
          type='submit'
        >
          Sign Up
        </Button>
      </form>

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
