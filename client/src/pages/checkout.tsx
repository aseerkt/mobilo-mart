import { Button } from '@chakra-ui/button';
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
} from '@chakra-ui/layout';
import Head from 'next/head';
import NextLink from 'next/link';
import { FaEnvelope, FaMapMarker, FaMapPin, FaPhone } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import withAuth from '../libs/withAuth';
import Layout from '../shared/Layout';
import useAddressStore from '../store/addressStore';
import useCartStore from '../store/cartStore';

function CheckoutPage() {
  const { getCurrentAddress } = useAddressStore();
  const { cartItems } = useCartStore();

  const address = getCurrentAddress();

  return (
    <div>
      <Head>
        <title>Checkout</title>
      </Head>
      <Layout>
        <Grid gap='10' templateColumns={{ base: '1fr', sm: 'auto 350px' }}>
          <GridItem>
            <Text fontSize='2xl' fontWeight='700' pb='5'>
              Cart Items
            </Text>
            <Divider mb='5' />
            {cartItems.map((i) => (
              <CartItem key={i.id} cartItem={i} />
            ))}
          </GridItem>
          <GridItem
            h='max-content'
            borderRadius='lg'
            border='1px solid lightgray'
            p='5'
          >
            <Text fontSize='xl' fontWeight='700' pb='5'>
              Delivery Address
            </Text>
            <Divider mb='5' />
            <Box fontSize='sm' lineHeight='1.6'>
              <Text fontWeight='semibold'>{address.fullName}</Text>
              <Text>{address.streetAddress}</Text>
              <Text>{address.city}</Text>
              <Text>{address.state}</Text>
              <Text>India</Text>
              <Flex align='center'>
                <FaPhone color='teal' />
                <Text ml='2'>{address.mobileNumber}</Text>
              </Flex>
              <Flex align='center'>
                <FaEnvelope color='teal' />
                <Text ml='2'>{address.emailAddress}</Text>
              </Flex>
              <Link as={NextLink} href='/addresses?buy=1'>
                <Button
                  mt='4'
                  colorScheme='blue'
                  variant='outline'
                  leftIcon={<FaMapMarker />}
                >
                  Change Address
                </Button>
              </Link>
            </Box>
            <Divider my='5' />
          </GridItem>
        </Grid>
      </Layout>
    </div>
  );
}

export default withAuth({ title: 'Checkout' })(CheckoutPage);
