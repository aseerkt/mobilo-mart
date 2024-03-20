import { Box, Link, Text } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

type FormWrapperProps = {
  title: string;
  headTitle?: string;
};

const FormWrapper: React.FC<React.PropsWithChildren<FormWrapperProps>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Link as={NextLink} href='/'>
        <Text
          cursor='pointer'
          textAlign='center'
          color='teal'
          textTransform='uppercase'
          fontSize='2xl'
          fontWeight='bold'
          marginY='5'
        >
          Mobilo Mart
        </Text>
      </Link>
      <Box
        maxW='md'
        marginX='auto'
        marginBottom='3'
        borderWidth='thin'
        borderStyle='solid'
        borderColor='gray.300'
        padding='7'
        borderRadius='md'
        boxShadow='lg'
      >
        <Head>
          <title>{title} | Mobilo Mart</title>
          <meta name='description' content='Login to Mobile Mart' />
        </Head>

        <Text fontSize='2xl' marginTop='3' marginBottom='5' fontWeight='bold'>
          {title}
        </Text>
        {children}
      </Box>
    </>
  );
};

export default FormWrapper;
