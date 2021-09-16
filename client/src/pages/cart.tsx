import CartItem from '@/components/CartItem';
import Layout from '@/shared/Layout';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/utils/formatNumbers';
import { Box, Button, Divider, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { FaCartPlus, FaLock } from 'react-icons/fa';

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = cartItems.reduce(
    (prev, curr) => prev + curr.qty * curr.price,
    0
  );
  const totalItems = cartItems.reduce((prev, curr) => prev + curr.qty, 0);

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
          <Box
            h='max-content'
            borderRadius='lg'
            border='1px solid lightgray'
            p='5'
          >
            <Text fontSize='lg' fontWeight='500' mb='2'>
              Subtotal ({totalItems} items):{' '}
              <Text fontWeight='700'>{formatPrice(totalPrice)}</Text>
            </Text>
            <Button colorScheme='teal'>Proceed To Buy</Button>
            <Text
              color='gray'
              fontSize='sm'
              display='flex'
              alignItems='center'
              mt='5'
            >
              {' '}
              <FaLock size='1.3em' style={{ marginRight: '0.5rem' }} />{' '}
              <span>Secure transaction</span>
            </Text>
          </Box>
        </Grid>
      </Layout>
    </div>
  );
}

export default Cart;
