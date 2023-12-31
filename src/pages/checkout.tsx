import Head from 'next/head';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/toast';
import { Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import CartItem from '@/components/CartItem';
import withAuth from '@/libs/withAuth';
import Layout from '@/shared/Layout';
import RazorpayButton from '../components/RazorpayButton';
import ShowAddress from '../components/ShowAddress';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';
import { useStore } from '../store';

function CheckoutPage() {
  const getCurrentAddress = useStore((state) => state.getCurrentAddress);
  const cartItems = useStore((state) => state.cartItems);
  const router = useRouter();
  const toast = useToast();

  const address = getCurrentAddress();

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
  }, [address]);

  return (
    <div>
      <Head>
        <title>Checkout</title>
        <script src='https://checkout.razorpay.com/v1/checkout.js'></script>
      </Head>
      <Layout>
        <Grid {...TWO_GRID_STYLES}>
          <GridItem h='full'>
            <Text fontSize='2xl' fontWeight='700' pb='5'>
              Confirm order
            </Text>
            <Divider mb='5' />
            {cartItems.map((i) => (
              <CartItem key={i.mobile.id} cartItem={i} />
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
          <ShowAddress address={address} showChangeAddress />
          <Divider my='5' />
          <RazorpayButton disabled={!address || cartItems.length === 0} />
        </Grid>
      </Layout>
    </div>
  );
}

export default withAuth({ title: 'Checkout' })(CheckoutPage);
