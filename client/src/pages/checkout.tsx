import CartItem from '@/components/CartItem';
import withAuth from '@/libs/withAuth';
import Layout from '@/shared/Layout';
import useAddressStore from '@/store/addressStore';
import useCartStore from '@/store/cartStore';
import { Divider, Grid, GridItem, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import RazorpayButton from '../components/RazorpayButton';
import ShowAddress from '../components/ShowAddress';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';

function CheckoutPage() {
  const getCurrentAddress = useAddressStore((state) => state.getCurrentAddress);
  const cartItems = useCartStore((state) => state.cartItems);
  const router = useRouter();
  const toast = useToast();

  const address = getCurrentAddress();

  useEffect(() => {
    if (!address || cartItems.length === 0) {
      toast({
        id: 'Checkout route redirect',
        title: 'Cannot proceed with Checkout',
        description: !address ? 'No address for delivery' : 'Cart is empty',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      router.push(!address ? '/addresses?buy=1' : '/');
    }
  }, [cartItems, address]);

  return (
    <div>
      <Head>
        <title>Checkout</title>
        <script src='https://checkout.razorpay.com/v1/checkout.js'></script>
      </Head>
      <Layout>
        <Grid {...TWO_GRID_STYLES}>
          <GridItem>
            <Text fontSize='2xl' fontWeight='700' pb='5'>
              Confirm order
            </Text>
            <Divider mb='5' />
            {cartItems.map((i) => (
              <CartItem key={i.mobile.id} cartItem={i} />
            ))}
          </GridItem>
          <ShowAddress address={address} showChangeAddress />
          <Divider my='5' />
          <RazorpayButton />
        </Grid>
      </Layout>
    </div>
  );
}

export default withAuth({ title: 'Checkout' })(CheckoutPage);
