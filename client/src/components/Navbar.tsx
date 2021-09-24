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
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
} from '@chakra-ui/react';
import { FaCartArrowDown, FaSearch, FaUserAlt } from 'react-icons/fa';
import NextLink from 'next/link';
import useUser from '@/libs/useUser';
import axios from 'axios';
import { useRouter } from 'next/router';
import useCartStore from '@/store/cartStore';

function Navbar() {
  const { user, loading } = useUser();
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);

  const logout = async function () {
    await axios.post('/users/logout');
    router.reload();
  };
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
        maxW='6xl'
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
        <Box flex='1' marginX='5'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={FaSearch} color='teal' />}
            />
            <Input variant='filled' type='number' />
          </InputGroup>
        </Box>
        <HStack fontWeight='bold' spacing={3}>
          <Link href='/cart' as={NextLink}>
            <Button leftIcon={<FaCartArrowDown size='1.3em' />}>
              {cartItems.length || 0}
            </Button>
          </Link>
          {loading ? null : user ? (
            <>
              <Menu placement='bottom-end'>
                <MenuButton
                  as={Button}
                  variant='outline'
                  leftIcon={<FaUserAlt size='1.3em' />}
                >
                  {user?.name}
                </MenuButton>
                <MenuList>
                  <NextLink href='/orders'>
                    <MenuItem>My Orders</MenuItem>
                  </NextLink>
                  <NextLink href='/cart'>
                    <MenuItem>My Cart</MenuItem>
                  </NextLink>
                  <NextLink href='/addresses'>
                    <MenuItem>My Addresses</MenuItem>
                  </NextLink>
                  <Divider />
                  <MenuItem onClick={logout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link href='/login' as={NextLink}>
              Login
            </Link>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
