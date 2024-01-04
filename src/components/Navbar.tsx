import { cartSelectors } from '@/store/cartStore';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FaCartArrowDown, FaUserAlt } from 'react-icons/fa';
import { useStore } from '../store';

function Navbar() {
  const { data, status } = useSession();
  const router = useRouter();
  const itemCount = useStore(cartSelectors.itemCountSelector);

  const logout = async function () {
    signOut({ redirect: false });
    router.reload();
  };

  const user = data?.user;
  const loading = status === 'loading';

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
            fontSize={{ base: 'md', sm: '2xl' }}
            fontWeight='bold'
          >
            Mobilo Mart
          </Text>
        </Link>
        {/* <Box flex='1' marginX='5'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={FaSearch} color='teal' />}
            />
            <Input variant='filled' type='number' />
          </InputGroup>
        </Box> */}
        <HStack fontWeight='bold' spacing={3} ml='auto'>
          <Link href='/cart' as={NextLink}>
            <Button leftIcon={<FaCartArrowDown size='1.3em' />}>
              {itemCount}
            </Button>
          </Link>
          {loading ? null : user ? (
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
