import { cartSelectors } from '@/store/cartStore';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
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
        <Link href='/'>
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
        <HStack fontWeight='bold' spacing={3} ml='auto'>
          <Link href='/cart'>
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
                <Link href='/orders'>
                  <MenuItem>My Orders</MenuItem>
                </Link>
                <Link href='/cart'>
                  <MenuItem>My Cart</MenuItem>
                </Link>
                <Link href='/addresses'>
                  <MenuItem>My Addresses</MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={logout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href='/login'>Login</Link>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
