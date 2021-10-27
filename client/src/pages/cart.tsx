import CartItem from '@/components/CartItem';
import Layout from '@/shared/Layout';
import useCartStore from '@/store/cartStore';
import { formatPrice } from '@/utils/formatNumbers';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  Text,
  chakra,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaCartPlus, FaLock } from 'react-icons/fa';
import useAddressStore from '@/store/addressStore';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';

function Cart() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalQty = useCartStore((state) => state.getTotalQty);
  const { hasCurrentAddress } = useAddressStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalQty();

  const onProceedToBuy = () => {
    if (!hasCurrentAddress()) router.push('/addresses?buy=1');
    else router.push('/checkout');
  };

  return (
    <div>
      <Head>
        <title>My Cart</title>
      </Head>
      <Layout>
        <Text fontSize='2xl' fontWeight='700' pb='5'>
          Shopping Cart
        </Text>
        <Divider mb='5' />
        <Grid {...TWO_GRID_STYLES}>
          <Box>
            {cartItems.map((i) => (
              <CartItem key={i.mobile.id} cartItem={i} />
            ))}
            {cartItems.length < 1 && (
              <Flex
                h='full'
                align='center'
                p='10'
                justify='center'
                border='1px solid lightblue'
              >
                <Icon as={FaCartPlus} boxSize={20} />
                <Text ml='5'>Your cart is empty</Text>
              </Flex>
            )}
          </Box>
          <Box
            h='max-content'
            borderRadius='lg'
            border='1px solid lightgray'
            p='5'
          >
            <Text fontSize='lg' fontWeight='500' mb='2'>
              Subtotal ({totalItems} items):{' '}
              <chakra.span fontWeight='700'>
                {formatPrice(totalPrice)}
              </chakra.span>
            </Text>
            <Button
              disabled={cartItems.length === 0}
              onClick={onProceedToBuy}
              colorScheme='teal'
            >
              Proceed To Buy
            </Button>
            <Flex color='gray' fontSize='sm' align='center' mt='5'>
              <FaLock size='1.3em' /> <Text ml='3'>Secure transaction</Text>
            </Flex>
          </Box>
        </Grid>
      </Layout>
    </div>
  );
}

export default Cart;
