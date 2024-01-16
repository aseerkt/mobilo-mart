import CartItem from '@/components/CartItem';
import withAuth from '@/libs/withAuth';
import Layout from '@/shared/Layout';
import { addressSelectors } from '@/store/addressStore';
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import RazorpayButton from '../components/RazorpayButton';
import ShowAddress from '../components/ShowAddress';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';
import { useStore } from '../store';

function CheckoutPage() {
  const address = useStore(addressSelectors.getCurrentAddressSelector);
  const cartItems = useStore((state) => state.cartItems);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!address) {
      toast({
        id: 'Checkout route redirect',
        title: 'Cannot proceed with vheckout',
        description: 'No address for delivery',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      router.push('/addresses?buy=1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div>
      <Head>
        <title>Checkout</title>
      </Head>
      <Script src='https://checkout.razorpay.com/v1/checkout.js'></Script>
      <Layout>
        <Grid {...TWO_GRID_STYLES}>
          <GridItem h='full'>
            <Text fontSize='2xl' fontWeight='700' pb='5'>
              Confirm order
            </Text>
            <Divider mb='5' />
            {cartItems.map((i) => (
              <CartItem key={i.product.id} cartItem={i} />
            ))}
            {cartItems.length === 0 && (
              <Flex
                direction='column'
                h='60'
                align='center'
                p='10'
                border='1px solid lightblue'
              >
                <Text fontWeight='700' mb='5'>
                  Cart is empty
                </Text>
                <Text mb='10' fontSize='sm'>
                  Cannot proceed with checkout
                </Text>
                <NextLink href='/#browse'>
                  <Button colorScheme='teal'>Browse Mobiles</Button>
                </NextLink>
              </Flex>
            )}
          </GridItem>
          {address && <ShowAddress address={address} showChangeAddress />}
          <Divider my='5' />
          <RazorpayButton disabled={!address || cartItems.length === 0} />
        </Grid>
      </Layout>
    </div>
  );
}

export default withAuth({ title: 'Checkout' })(CheckoutPage);
