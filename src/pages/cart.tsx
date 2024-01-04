import Layout from '@/shared/Layout';
import { addressSelectors } from '@/store/addressStore';
import { cartSelectors } from '@/store/cartStore';
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
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaCartPlus, FaLock } from 'react-icons/fa';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';
import { useStore } from '../store';

const CartItem = dynamic(() => import('../components/CartItem'));

function Cart() {
  const router = useRouter();
  const cartItems = useStore((state) => state.cartItems);
  const isCartEmpty = useStore(cartSelectors.isCartEmptySelector);
  const totalPrice = useStore(cartSelectors.totalPriceSelector);
  const totalQty = useStore(cartSelectors.totalQtySelector);
  const hasCurrentAddress = useStore(
    addressSelectors.hasCurrentAddressSelector
  );

  const onProceedToBuy = () => {
    if (!hasCurrentAddress) router.push('/addresses?buy=1');
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
              Subtotal ({totalQty} items):{' '}
              <chakra.span fontWeight='700'>
                {formatPrice(totalPrice)}
              </chakra.span>
            </Text>
            <Button
              disabled={isCartEmpty}
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
