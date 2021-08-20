import CartItem from '@/components/CartItem';
import Layout from '@/shared/Layout';
import useCartStore from '@/store/cartStore';
import { Box, Divider, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { FaCartPlus } from 'react-icons/fa';

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div>
      <Head>
        <title>My Cart</title>
      </Head>
      <Layout>
        <Grid gap='5' templateColumns={{ base: '1fr', sm: 'auto 350px' }}>
          <Box>
            <Text fontSize='2xl' fontWeight='700' pb='5'>
              Shopping Cart
            </Text>
            <Divider />
            <Box>
              {cartItems.map((i) => (
                <CartItem key={i.id} cartItem={i} />
              ))}
              {cartItems.length < 1 && (
                <Flex align='center' p='10' justify='center'>
                  <Icon as={FaCartPlus} boxSize={20} />
                  <Text ml='5'>Your cart is empty</Text>
                </Flex>
              )}
            </Box>
          </Box>
          <Box borderRadius='lg' border='1px solid lightgray' p='5'></Box>
        </Grid>
      </Layout>
    </div>
  );
}

export default Cart;
