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
    <Box
      h='16'
      w='full'
      boxShadow='base'
      pos='sticky'
      top='0'
      zIndex={100}
      bg='white'
    >
      <Flex
        h='full'
        justifyContent='space-between'
        alignItems='center'
        maxW='5xl'
        paddingX='5'
        marginX='auto'
      >
        <Link as={NextLink} href='/'>
          <Text
            cursor='pointer'
            textAlign='center'
            color='teal'
            textTransform='uppercase'
            fontSize='2xl'
            fontWeight='bold'
          >
            Mobilo Mart
          </Text>
        </Link>
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
