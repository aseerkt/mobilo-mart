import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';

function Navbar() {
  return (
    <Box h='16' w='full' boxShadow='base'>
      <Flex
        h='full'
        justifyContent='space-between'
        alignItems='center'
        maxW='5xl'
        paddingX='5'
        marginX='auto'
      >
        <NextLink href='/'>
          <Text
            color='teal'
            textTransform='uppercase'
            fontSize='2xl'
            fontWeight='bold'
          >
            Mobilo Mart
          </Text>
        </NextLink>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={FaSearch} color='teal' />}
            />
            <Input variant='filled' type='number' />
          </InputGroup>
        </Box>
        <HStack fontWeight='bold' spacing={3}>
          <Link href='/login' as={NextLink}>
            Login
          </Link>
          <Link href='/register' as={NextLink}>
            Sign Up
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
