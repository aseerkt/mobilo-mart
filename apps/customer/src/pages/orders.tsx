import withAuth from '@/libs/withAuth';
import { Button, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import OrderEntry from '../components/OrderEntry';
import ShowAddress from '../components/ShowAddress';
import useOrders from '../libs/hooks/useOrders';
import Layout from '../shared/Layout';
import { TWO_GRID_STYLES } from '../shared/twoGridStyles';

function OrdersPage() {
  const { loading, orders } = useOrders();

  return (
    <div>
      <Layout>
        <Text fontSize='2xl' fontWeight='700' pb='5'>
          My Orders
        </Text>
        <Divider mb='5' />
        {orders?.map((order) => (
          <Grid
            border='1px solid lightgray'
            key={order.id}
            {...TWO_GRID_STYLES}
            mb='10'
          >
            <GridItem>
              {order.items.map((item) => (
                <OrderEntry key={item.id} orderItem={item} />
              ))}
            </GridItem>
            <ShowAddress address={order.address} />
          </Grid>
        ))}
        {orders?.length === 0 && (
          <Flex
            h='60'
            align='center'
            justify='center'
            direction='column'
            border='1px solid lightblue'
          >
            <Text fontSize='lg' fontWeight='semibold' mb='10'>
              You have not placed any orders
            </Text>
            <NextLink href='/#browse'>
              <Button colorScheme='teal'>Browse mobiles</Button>
            </NextLink>
          </Flex>
        )}
      </Layout>
    </div>
  );
}

export default withAuth({ title: 'My Orders' })(OrdersPage);
